import { SaveOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/component/button';
import { Form, FormItem } from '@/component/form';
import { AmountInput } from '@/component/input';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { resolveFile } from '@/services/file';
import { toPersianDigits } from '@/utils/date';
import { formatAmount } from '@/utils/number';

import { getAverages, saveAverages } from '../api';
import { type AverageDocFormValues, type MonthlyAverage } from '../types';

import { AverageDocModal } from './AverageDocModal';

interface AveragesFormValues {
  averages: (string | null)[];
}

const toNumber = (value?: string | null) => (value ? Number(value) : null);

const columns: ColumnsType<MonthlyAverage> = [
  { title: 'ماه', dataIndex: 'month', render: (month: number) => `ماه ${toPersianDigits(month)}` },
  {
    title: 'میانگین موجودی (ریال)',
    key: 'average',
    render: (_value, row) => (
      <FormItem name={['averages', row.month - 1]} noStyle>
        <AmountInput style={{ width: 240 }} />
      </FormItem>
    ),
  },
  {
    title: 'مانده اعتبار تا این ماه (محاسبه‌شده)',
    dataIndex: 'remainingCredit',
    render: (value: number | null) =>
      value === null ? '—' : <b>{toPersianDigits(formatAmount(value))} ریال</b>,
  },
];

/** جدول میانگین موجودی ماه‌های سال جاری قرارداد */
export const AveragesTable = ({ companyId }: { companyId: string }) => {
  const [form] = Form.useForm<AveragesFormValues>();
  const queryClient = useQueryClient();
  const [changedMonths, setChangedMonths] = useState<number[]>([]);

  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.COMPANIES.AVERAGES(companyId),
    queryFn: () => getAverages(companyId),
  });

  const initialValues = useMemo(
    () => ({
      averages: data?.map((item) => (item.average === null ? null : String(item.average))),
    }),
    [data],
  );

  // با هر بار دریافت سرویس (اولین بار یا بعد از ذخیره) مقادیر فرم به‌روز می‌شود
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ file, docTypeId, note }: AverageDocFormValues) => {
      const uploaded = await resolveFile(file);
      const averages = form.getFieldValue('averages') as AveragesFormValues['averages'];
      const items = changedMonths.map((month) => ({
        month,
        average: toNumber(averages[month - 1]),
      }));
      return saveAverages(companyId, { items, docTypeId, fileId: uploaded?.id ?? '', note });
    },
    onSuccess: () => {
      // سرویس میانگین‌ها و مستندات دوباره فراخوانی می‌شود
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMPANIES.AVERAGES(companyId) });
      void queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMPANIES.AVERAGE_DOCS(companyId),
      });
      setChangedMonths([]);
      toast.success('میانگین‌ها و مستند ثبت شد.');
    },
  });

  const handleFinish = ({ averages }: AveragesFormValues) => {
    const changed = (data ?? [])
      .filter((item) => toNumber(averages[item.month - 1]) !== item.average)
      .map((item) => item.month);
    if (changed.length === 0) {
      toast.info('تغییری در میانگین‌ها ایجاد نشده است.');
      return;
    }
    setChangedMonths(changed);
  };

  return (
    <>
      <Form<AveragesFormValues> form={form} onFinish={handleFinish}>
        <Table<MonthlyAverage>
          rowKey="month"
          columns={columns}
          dataSource={data}
          loading={isFetching}
          maxHeight={440}
        />
        <Button
          variant="primary"
          size="small"
          htmlType="submit"
          icon={<SaveOutlined />}
          className="mt-3"
        >
          ذخیره میانگین‌ها
        </Button>
      </Form>
      <AverageDocModal
        open={changedMonths.length > 0}
        months={changedMonths}
        onSubmit={mutateAsync}
        onClose={() => setChangedMonths([])}
      />
    </>
  );
};
