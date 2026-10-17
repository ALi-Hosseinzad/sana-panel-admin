import { useQuery } from '@tanstack/react-query';
import { type ColumnsType } from 'antd/es/table';

import { Table } from '@/component/table';
import { Typography } from '@/component/typography';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { formatJalali, toPersianDigits } from '@/utils/date';

import { getAverageDocs } from '../api';
import { type AverageDoc } from '../types';

const columns: ColumnsType<AverageDoc> = [
  {
    title: 'تاریخ ثبت',
    dataIndex: 'createdAt',
    render: (value: string) => formatJalali(value, undefined, { persianDigits: true }),
  },
  {
    title: 'ماه‌های ثبت/تغییر یافته',
    dataIndex: 'months',
    render: (months: number[]) => toPersianDigits(months.join('، ')),
  },
  { title: 'نوع مستند', dataIndex: 'docType' },
  { title: 'فایل', dataIndex: ['file', 'name'] },
  { title: 'توضیحات', dataIndex: 'note', render: (value?: string) => value ?? '—' },
  { title: 'ثبت‌کننده', dataIndex: 'createdBy' },
];

export const AverageDocsTable = ({ companyId }: { companyId: string }) => {
  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.COMPANIES.AVERAGE_DOCS(companyId),
    queryFn: () => getAverageDocs(companyId),
  });

  return (
    <>
      <Typography as="title" level={3} size="md" color="heading" className="mt-6 mb-3">
        مستندات ثبت‌شده میانگین موجودی
      </Typography>
      <Table<AverageDoc>
        columns={columns}
        dataSource={data}
        loading={isFetching}
        locale={{ emptyText: 'هنوز مستندی ثبت نشده است.' }}
      />
    </>
  );
};
