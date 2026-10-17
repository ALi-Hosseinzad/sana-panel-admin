import { SendOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/component/button';
import { NoticeCard, PanelCard } from '@/component/card';
import { Form, FormItem } from '@/component/form';
import { SelectInput } from '@/component/input';
import { RadioGroup } from '@/component/radio';
import { Typography } from '@/component/typography';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { StaffSearch } from '@/features/staff/components';
import { type StaffFilters } from '@/features/staff/types';
import { toPersianDigits } from '@/utils/date';

import { getCreditSummary, getEligibility } from '../api';
import { useCreateLoanRequest } from '../hooks/useCreateLoanRequest';
import { type LoanRequestFormValues, type PlanCredit } from '../types';
import { buildRequestItems, buildSuggestion, selectedAmounts } from '../utils';

import { FixedAmountField } from './FixedAmountField';
import { StaffPickTable } from './StaffPickTable';

interface LoanRequestCardProps {
  companyId: string;
  date: string;
  filters: StaffFilters;
}

const INITIAL_VALUES: LoanRequestFormValues = { amountMode: 'fixed' };

const AMOUNT_MODES = [
  { value: 'fixed', label: 'مبلغ یکسان برای همه' },
  { value: 'variable', label: 'مبلغ متفاوت برای هرکس' },
];

const planOption = (plan: PlanCredit) => ({
  value: plan.planId,
  label: toPersianDigits(`${plan.typeTitle} - نرخ ${plan.rate}٪ - مدت ${plan.term} ماه`),
});

/** ثبت درخواست تخصیص وام به پرسنل */
export const LoanRequestCard = ({ companyId, date, filters }: LoanRequestCardProps) => {
  const [form] = Form.useForm<LoanRequestFormValues>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data: summary } = useQuery({
    queryKey: QUERY_KEYS.CREDIT.SUMMARY(companyId, date),
    queryFn: () => getCreditSummary(companyId, date),
  });
  const { data: eligibility } = useQuery({
    queryKey: QUERY_KEYS.CREDIT.ELIGIBILITY(companyId, date),
    queryFn: () => getEligibility(companyId, date),
  });

  const plans = useMemo(() => summary?.plans ?? [], [summary]);
  const canAllocate = Boolean(eligibility?.canAllocate);
  const values = Form.useWatch([], form) ?? INITIAL_VALUES;
  const plan = plans.find((item) => item.planId === values.planId);

  // اگر طرحی انتخاب نشده یا طرح انتخاب‌شده دیگر وجود ندارد، اولین طرح انتخاب می‌شود
  useEffect(() => {
    const current = form.getFieldValue('planId') as string | undefined;
    if (!plans.some((item) => item.planId === current)) {
      form.setFieldValue('planId', plans[0]?.planId);
    }
  }, [plans, form]);

  // بعد از ثبت، مبالغ و انتخاب‌ها پاک می‌شوند ولی ترتیب پرداخت هر ردیف می‌ماند
  const { mutate, isPending } = useCreateLoanRequest(companyId, () => {
    const rows = (form.getFieldValue('rows') ?? {}) as NonNullable<LoanRequestFormValues['rows']>;
    form.setFieldsValue({
      fixedAmount: undefined,
      rows: Object.fromEntries(
        Object.entries(rows).map(([id, row]) => [id, { ...row, amount: undefined }]),
      ),
    });
    setSelectedIds([]);
  });

  const handleFinish = (formValues: LoanRequestFormValues) => {
    if (!plan) return;
    if (!selectedIds.length) {
      toast.error('حداقل یک پرسنل را از جدول انتخاب کنید.');
      return;
    }
    if (selectedAmounts(formValues, selectedIds).some((amount) => !amount)) {
      toast.error('مبلغ وام برای همه افراد انتخاب‌شده باید وارد شود.');
      return;
    }
    mutate({ planId: plan.planId, date, items: buildRequestItems(formValues, selectedIds) });
  };

  const suggestion = plan ? buildSuggestion(plan.available, values, selectedIds) : null;
  const isVariable = values.amountMode === 'variable';

  return (
    <PanelCard
      title="ثبت درخواست تخصیص وام به پرسنل"
      subtitle="ابتدا طرح این ماه را انتخاب کنید، سپس پرسنل و مبلغ وام را مشخص کنید. فقط طرح‌های مندرج در تفاهم‌نامه این شرکت قابل انتخاب است."
    >
      {/* component={false}: تگ form ساخته نمی‌شود تا فرم جستجوی داخل آن تودرتو نشود */}
      <Form<LoanRequestFormValues>
        form={form}
        component={false}
        initialValues={INITIAL_VALUES}
        disabled={!canAllocate}
        onFinish={handleFinish}
      >
        <div className="max-w-[480px]">
          <FormItem name="planId" label="طرح این ماه (طبق تفاهم‌نامه)" required>
            <SelectInput
              allowClear={false}
              placeholder="این شرکت هنوز طرحی ندارد"
              options={plans.map(planOption)}
            />
          </FormItem>
        </div>
        <FormItem name="amountMode">
          <RadioGroup options={AMOUNT_MODES} />
        </FormItem>

        <Typography as="title" level={3} size="md" color="heading" className="mb-3">
          انتخاب پرسنل{' '}
          {selectedIds.length > 0 && (
            <span className="text-xs font-normal text-ink-soft">
              ({toPersianDigits(selectedIds.length)} نفر انتخاب‌شده)
            </span>
          )}
        </Typography>
        <StaffSearch />
        <p className="mt-0 mb-2 text-xs text-ink-soft">
          فهرست بر اساس اولویت ثبت‌شده پرسنل مرتب شده؛ ستون «ترتیب پرداخت» را می‌توانید برای همین
          تخصیص دستی تغییر دهید.
        </p>
        <StaffPickTable
          companyId={companyId}
          filters={filters}
          variableAmount={isVariable}
          disabled={!canAllocate}
          selectedIds={selectedIds}
          onSelect={setSelectedIds}
        />
        {!isVariable && <FixedAmountField amount={Number(values.fixedAmount ?? 0)} />}
      </Form>

      {suggestion && (
        <NoticeCard type={suggestion.isError ? 'error' : 'suggestion'} className="mt-3">
          {suggestion.text}
        </NoticeCard>
      )}
      {!canAllocate && (
        <p className="mt-2 text-xs text-danger">
          تا رسیدن تاریخ و شرایط مجاز (طبق پیام بالا)، امکان انتخاب پرسنل و ثبت درخواست وجود ندارد.
        </p>
      )}
      <Button
        variant="primary"
        icon={<SendOutlined />}
        disabled={!canAllocate || !plan}
        loading={isPending}
        onClick={() => form.submit()}
        className="mt-2"
      >
        ثبت درخواست برای پرسنل انتخاب‌شده
      </Button>
    </PanelCard>
  );
};
