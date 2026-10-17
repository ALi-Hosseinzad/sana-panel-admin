import { type ColumnsType } from 'antd/es/table';

import { Form, FormItem } from '@/component/form';
import { NumberInput } from '@/component/input';
import { Table } from '@/component/table';
import { toPersianDigits } from '@/utils/date';

import { SectionHeader } from './SectionHeader';

interface MatrixRow {
  id: number;
  term: number;
}

const UsableCell = ({ row, column }: { row: number; column: number }) => (
  <FormItem name={['usable', row, column]} noStyle>
    <NumberInput min={0} max={100} style={{ width: 90 }} />
  </FormItem>
);

/** جدول درصد قابل استفاده از میانگین (ردیف: مدت بازپرداخت · ستون: نرخ تسهیلات) */
export const UsableMatrix = () => {
  const terms = Form.useWatch<number[] | undefined>('terms') ?? [];
  const rates = Form.useWatch<number[] | undefined>('murabahaRates') ?? [];
  const qarzRate = Form.useWatch<number | undefined>('qarzRate') ?? 0;

  const columns: ColumnsType<MatrixRow> = [
    {
      title: 'مدت \\ نرخ',
      key: 'term',
      render: (_value, row) => `${toPersianDigits(row.term)} ماهه`,
    },
    {
      title: `قرض‌الحسنه (${toPersianDigits(qarzRate)}٪)`,
      key: 'qarz',
      align: 'center',
      render: (_value, row) => <UsableCell row={row.id} column={0} />,
    },
    ...rates.map((rate, index) => ({
      title: `مرابحه ${toPersianDigits(rate)}٪`,
      key: `rate-${index}`,
      align: 'center' as const,
      render: (_value: unknown, row: MatrixRow) => <UsableCell row={row.id} column={index + 1} />,
    })),
  ];

  return (
    <>
      <SectionHeader
        title="جدول درصد قابل استفاده از میانگین"
        subtitle="هر ردیف یک مدت بازپرداخت و هر ستون یک نرخ تسهیلات است؛ عدد داخل جدول، درصد قابل استفاده از مجموع میانگین حساب برای آن ترکیب است."
      />
      <Table<MatrixRow>
        columns={columns}
        dataSource={terms.map((term, index) => ({ id: index, term }))}
      />
    </>
  );
};
