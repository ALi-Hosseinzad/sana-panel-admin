import { useQuery } from '@tanstack/react-query';
import { type ColumnsType } from 'antd/es/table';

import { PanelCard } from '@/component/card';
import { StatusChip } from '@/component/status-chip';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { formatJalali, toPersianDigits } from '@/utils/date';
import { formatRial } from '@/utils/number';

import { getRemovedCompanies } from '../api';
import { type RemovedCompany } from '../types';

const columns: ColumnsType<RemovedCompany> = [
  { title: 'شرکت', dataIndex: 'companyName' },
  {
    title: 'وضعیت',
    dataIndex: 'reason',
    render: (reason: RemovedCompany['reason']) => (
      <StatusChip tone={reason === 'deleted' ? 'default' : 'error'}>
        {reason === 'deleted' ? 'حذف‌شده' : 'لغوشده'}
      </StatusChip>
    ),
  },
  {
    title: 'تاریخ حذف',
    dataIndex: 'removedAt',
    render: (value: string | null) =>
      value ? formatJalali(value, undefined, { persianDigits: true }) : '—',
  },
  { title: 'میانگین موجودی', dataIndex: 'totalAverage', render: formatRial },
  { title: 'مجموع وام تخصیص‌یافته', dataIndex: 'disbursed', render: formatRial },
  { title: 'تعداد درخواست', dataIndex: 'requestCount', render: (v: number) => toPersianDigits(v) },
  {
    title: 'نرخ تأیید',
    dataIndex: 'approvalRate',
    render: (value: number | null) => (value === null ? '—' : toPersianDigits(`${value}٪`)),
  },
];

export const RemovedCompaniesTable = () => {
  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.REMOVED_COMPANIES,
    queryFn: getRemovedCompanies,
  });

  return (
    <PanelCard
      title="شرکت‌های حذف‌شده/لغوشده"
      subtitle="عملکرد شرکت‌هایی که از سامانه حذف یا قراردادشان لغو شده، برای ارزیابی اینکه همکاری خوبی بوده یا نه"
    >
      <Table<RemovedCompany>
        rowKey="companyName"
        columns={columns}
        dataSource={data}
        loading={isFetching}
        locale={{ emptyText: 'شرکت حذف‌شده‌ای وجود ندارد.' }}
      />
    </PanelCard>
  );
};
