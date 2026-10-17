import { useQuery } from '@tanstack/react-query';
import { type ColumnsType } from 'antd/es/table';

import { PanelCard } from '@/component/card';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { toPersianDigits } from '@/utils/date';
import { formatRial } from '@/utils/number';

import { getMonthlyPerformance } from '../api';
import { type MonthlyPerformance } from '../types';

type Row = MonthlyPerformance['rows'][number];

/** ستون‌ها از ماه‌هایی که سرویس برمی‌گرداند ساخته می‌شوند */
const buildColumns = (months: string[]): ColumnsType<Row> => [
  { title: 'شرکت', dataIndex: 'companyName', fixed: 'start' },
  ...months.map((month) => ({
    title: toPersianDigits(month),
    key: month,
    render: (_value: unknown, row: Row) => {
      const amount = row.amounts[month] ?? 0;
      return amount ? formatRial(amount) : '—';
    },
  })),
];

export const MonthlyPerformanceTable = () => {
  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.MONTHLY_PERFORMANCE,
    queryFn: getMonthlyPerformance,
  });

  return (
    <PanelCard
      title="عملکرد ماهانه شرکت‌ها (مبلغ وام تخصیص‌یافته)"
      subtitle="مجموع مبلغ وام تخصیص‌یافته هر شرکت در هر ماه شمسی"
    >
      <Table<Row>
        rowKey="companyName"
        columns={buildColumns(data?.months ?? [])}
        dataSource={data?.months.length ? data.rows : []}
        loading={isFetching}
        locale={{ emptyText: 'هنوز داده کافی برای این گزارش وجود ندارد.' }}
      />
    </PanelCard>
  );
};
