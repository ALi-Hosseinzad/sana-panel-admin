import { useQuery } from '@tanstack/react-query';
import { type ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { PanelCard } from '@/component/card';
import { SelectInput } from '@/component/input';
import { StatusChip } from '@/component/status-chip';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { toPersianDigits } from '@/utils/date';
import { formatRial } from '@/utils/number';

import { getRanking, getRequestMonths } from '../api';
import { type CompanyRank, type RankingSort } from '../types';

const ALL_MONTHS = 'all';

const SORT_OPTIONS: { value: RankingSort; label: string }[] = [
  { value: 'avg', label: 'بیشترین میانگین موجودی' },
  { value: 'loan', label: 'بیشترین مبلغ وام تخصیص‌یافته' },
  { value: 'count', label: 'بیشترین تعداد درخواست' },
  { value: 'staff', label: 'بیشترین تعداد پرسنل' },
];

const columns: ColumnsType<CompanyRank> = [
  {
    title: 'رتبه',
    dataIndex: 'rank',
    align: 'center',
    render: (v: number) => <b>{toPersianDigits(v)}</b>,
  },
  { title: 'شرکت', dataIndex: 'companyName' },
  { title: 'میانگین موجودی', dataIndex: 'totalAverage', render: formatRial },
  { title: 'مجموع وام تخصیص‌یافته', dataIndex: 'disbursed', render: formatRial },
  { title: 'تعداد درخواست', dataIndex: 'requestCount', render: (v: number) => toPersianDigits(v) },
  { title: 'تعداد پرسنل', dataIndex: 'staffCount', render: (v: number) => toPersianDigits(v) },
  {
    title: 'وضعیت',
    key: 'status',
    render: (_value, row) => (
      <StatusChip tone={row.status === 'active' ? 'success' : 'error'}>
        {row.statusTitle}
      </StatusChip>
    ),
  },
];

export const CompanyRanking = () => {
  const [month, setMonth] = useState<string>(ALL_MONTHS);
  const [sortBy, setSortBy] = useState<RankingSort>('avg');
  const monthParam = month === ALL_MONTHS ? undefined : month;

  const { data: months } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.MONTHS,
    queryFn: getRequestMonths,
  });
  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.RANKING(monthParam, sortBy),
    queryFn: () => getRanking({ month: monthParam, sortBy }),
  });

  return (
    <PanelCard
      title="رتبه‌بندی شرکت‌ها"
      subtitle="وقتی یک ماه خاص انتخاب شود، ستون‌های «وام تخصیص‌یافته» و «تعداد درخواست» فقط همان ماه را نشان می‌دهند."
      extra={
        <>
          <SelectInput
            size="small"
            allowClear={false}
            style={{ minWidth: 180 }}
            aria-label="ماه"
            value={month}
            onChange={setMonth}
            options={[
              { value: ALL_MONTHS, label: 'همه ماه‌ها (تجمعی)' },
              ...(months ?? []).map((item) => ({ value: item.id, label: item.title })),
            ]}
          />
          <SelectInput<RankingSort>
            size="small"
            allowClear={false}
            showSearch={false}
            style={{ minWidth: 220 }}
            aria-label="مرتب‌سازی"
            value={sortBy}
            onChange={setSortBy}
            options={SORT_OPTIONS}
          />
        </>
      }
    >
      <Table<CompanyRank>
        rowKey="companyName"
        columns={columns}
        dataSource={data}
        loading={isFetching}
        locale={{ emptyText: 'هنوز شرکتی ثبت نشده است.' }}
      />
    </PanelCard>
  );
};
