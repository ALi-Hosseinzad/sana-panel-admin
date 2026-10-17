import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { PanelCard } from '@/component/card';
import { Form, FormItem } from '@/component/form';
import { NumberInput } from '@/component/input';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { toPersianDigits } from '@/utils/date';

import { getUsableMatrix, updateUsableMatrix } from '../api';
import { type UsableMatrix } from '../types';

import { SaveButton } from './CardActions';

interface MatrixRow {
  id: number;
  term: number;
}

const UsableCell = ({ row, column }: { row: number; column: number }) => (
  <FormItem name={['values', row, column]} noStyle>
    <NumberInput min={0} max={100} style={{ width: 90 }} />
  </FormItem>
);

const buildColumns = (matrix?: UsableMatrix): ColumnsType<MatrixRow> => [
  {
    title: 'مدت \\ نرخ',
    key: 'term',
    render: (_value, row) => `${toPersianDigits(row.term)} ماهه`,
  },
  {
    title: `قرض‌الحسنه (${toPersianDigits(matrix?.qarzRate ?? 0)}٪)`,
    key: 'qarz',
    align: 'center',
    render: (_value, row) => <UsableCell row={row.id} column={0} />,
  },
  ...(matrix?.murabahaRates ?? []).map((rate, index) => ({
    title: `مرابحه ${toPersianDigits(rate)}٪`,
    key: `rate-${index}`,
    align: 'center' as const,
    render: (_value: unknown, row: MatrixRow) => <UsableCell row={row.id} column={index + 1} />,
  })),
];

/** جدول درصد قابل استفاده از میانگین (ردیف: مدت بازپرداخت · ستون: نرخ تسهیلات) */
export const UsableMatrixCard = () => {
  const [form] = Form.useForm<Pick<UsableMatrix, 'values'>>();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.BASE_INFO.USABLE_MATRIX,
    queryFn: getUsableMatrix,
  });

  useEffect(() => {
    if (data) form.setFieldsValue({ values: data.values });
  }, [data, form]);

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: updateUsableMatrix,
    onSuccess: (saved) => {
      queryClient.setQueryData(QUERY_KEYS.BASE_INFO.USABLE_MATRIX, saved);
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOOKUPS.PLANS });
      toast.success('جدول درصد قابل استفاده ذخیره شد.');
    },
  });

  return (
    <PanelCard
      title="جدول درصد قابل استفاده از میانگین"
      subtitle="هر ردیف یک مدت بازپرداخت و هر ستون یک نرخ تسهیلات است؛ عدد داخل جدول، درصد قابل استفاده از مجموع میانگین حساب برای آن ترکیب است."
    >
      <Form<Pick<UsableMatrix, 'values'>> form={form} onFinish={({ values }) => mutate(values)}>
        <Table<MatrixRow>
          columns={buildColumns(data)}
          dataSource={data?.terms.map((term, index) => ({ id: index, term }))}
          loading={isFetching}
        />
        <div className="mt-3">
          <SaveButton loading={isSaving} />
        </div>
      </Form>
    </PanelCard>
  );
};
