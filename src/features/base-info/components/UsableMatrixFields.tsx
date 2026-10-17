import { type ColumnsType } from 'antd/es/table';

import { PanelCard } from '@/component/card';
import { Form, FormItem } from '@/component/form';
import { NumberInput } from '@/component/input';
import { Table } from '@/component/table';
import { toPersianDigits } from '@/utils/date';

interface MatrixRow {
  id: number;
  term?: number;
}

const UsableCell = ({ row, column }: { row: number; column: number }) => (
  <FormItem name={['usable', row, column]} noStyle>
    <NumberInput min={0} max={100} style={{ width: 90 }} placeholder="۰" />
  </FormItem>
);

/** عدد وارد نشده با خط تیره نمایش داده می‌شود */
const display = (value?: number) => (typeof value === 'number' ? toPersianDigits(value) : '—');

const buildColumns = (qarzRate?: number, murabahaRates: number[] = []): ColumnsType<MatrixRow> => [
  {
    title: 'مدت \\ نرخ',
    key: 'term',
    render: (_value, row) => `${display(row.term)} ماهه`,
  },
  {
    title: `قرض‌الحسنه (${display(qarzRate)}٪)`,
    key: 'qarz',
    align: 'center',
    render: (_value, row) => <UsableCell row={row.id} column={0} />,
  },
  ...murabahaRates.map((rate, index) => ({
    title: `مرابحه ${display(rate)}٪`,
    key: `rate-${index}`,
    align: 'center' as const,
    render: (_value: unknown, row: MatrixRow) => <UsableCell row={row.id} column={index + 1} />,
  })),
];

/** جدول درصد قابل استفاده از میانگین (ردیف: مدت بازپرداخت · ستون: نرخ تسهیلات) */
export const UsableMatrixFields = () => {
  const qarzRate = Form.useWatch<number | undefined>('qarzRate');
  const murabahaRates = Form.useWatch<number[] | undefined>('murabahaRates');
  const terms = Form.useWatch<number[] | undefined>('terms');

  return (
    <PanelCard
      title="جدول درصد قابل استفاده از میانگین"
      subtitle="هر ردیف یک مدت بازپرداخت و هر ستون یک نرخ تسهیلات است؛ عدد داخل جدول، درصد قابل استفاده از مجموع میانگین حساب برای آن ترکیب است. خانه‌های خالی صفر ذخیره می‌شوند."
    >
      <Table<MatrixRow>
        columns={buildColumns(qarzRate, murabahaRates)}
        dataSource={terms?.map((term, index) => ({ id: index, term }))}
        locale={{ emptyText: 'برای ساخت جدول ابتدا مدت‌های بازپرداخت را اضافه کنید.' }}
      />
    </PanelCard>
  );
};
