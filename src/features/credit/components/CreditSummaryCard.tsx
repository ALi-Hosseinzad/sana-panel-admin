import { useQuery } from '@tanstack/react-query';
import { type ColumnsType } from 'antd/es/table';

import { KpiCard, PanelCard } from '@/component/card';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { toPersianDigits } from '@/utils/date';
import { formatRial } from '@/utils/number';
import { rialToTomanWords } from '@/utils/numberToWords';

import { getCreditSummary } from '../api';
import { type PlanCredit } from '../types';

const columns: ColumnsType<PlanCredit> = [
  { title: 'نوع تسهیلات', dataIndex: 'typeTitle' },
  { title: 'نرخ', dataIndex: 'rate', render: (value: number) => toPersianDigits(`${value}٪`) },
  { title: 'مدت', dataIndex: 'term', render: (value: number) => toPersianDigits(`${value} ماه`) },
  {
    title: 'سهم از میانگین',
    dataIndex: 'sharePercent',
    render: (value: number) => toPersianDigits(`${value.toFixed(1)}٪`),
  },
  {
    title: 'درصد قابل‌استفاده',
    dataIndex: 'usable',
    render: (value: number) => toPersianDigits(`${value}٪`),
  },
  { title: 'اعتبار ایجادشده (تجمعی)', dataIndex: 'created', render: formatRial },
  { title: 'تخصیص‌یافته', dataIndex: 'disbursed', render: formatRial },
  {
    title: 'مانده اعتبار ماه',
    dataIndex: 'available',
    render: (value: number) => <b>{formatRial(value)}</b>,
  },
];

interface CreditSummaryCardProps {
  companyId: string;
  date: string;
}

/** مانده اعتبار ماه: میانگین‌ها و اعتبار هر طرح شرکت */
export const CreditSummaryCard = ({ companyId, date }: CreditSummaryCardProps) => {
  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.CREDIT.SUMMARY(companyId, date),
    queryFn: () => getCreditSummary(companyId, date),
  });

  return (
    <PanelCard
      title="مانده اعتبار ماه"
      subtitle="میانگین موجودی از صفحه «مدیریت شرکت‌ها» ثبت می‌شود."
    >
      <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
        <KpiCard
          label="مجموع میانگین مبنای محاسبه اعتبار"
          value={formatRial(data?.totalAverage ?? 0)}
          footer={data ? rialToTomanWords(data.totalAverage) : undefined}
          loading={isFetching}
        />
        <KpiCard
          label="میانگین ماه جاری"
          value={formatRial(data?.currentMonthAverage ?? 0)}
          footer={data ? rialToTomanWords(data.currentMonthAverage) : undefined}
          loading={isFetching}
        />
      </div>
      <Table<PlanCredit>
        rowKey="planId"
        columns={columns}
        dataSource={data?.plans}
        loading={isFetching}
        locale={{ emptyText: 'این شرکت هنوز طرحی ندارد.' }}
      />
    </PanelCard>
  );
};
