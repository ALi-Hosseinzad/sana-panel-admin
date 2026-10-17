import { useQuery } from '@tanstack/react-query';
import { type ColumnsType } from 'antd/es/table';

import { PanelCard } from '@/component/card';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { toPersianDigits } from '@/utils/date';

import { getContractsByMonth } from '../api';
import { type ContractsByMonth } from '../types';

const columns: ColumnsType<ContractsByMonth> = [
  { title: 'ماه انعقاد', dataIndex: 'month' },
  { title: 'تعداد شرکت', dataIndex: 'count', render: (v: number) => toPersianDigits(v) },
  { title: 'نام شرکت‌ها', dataIndex: 'companies', render: (names: string[]) => names.join('، ') },
];

export const ContractsByMonthTable = () => {
  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.CONTRACTS_BY_MONTH,
    queryFn: getContractsByMonth,
  });

  return (
    <PanelCard
      title="تفاهم‌نامه‌های منعقدشده به تفکیک ماه"
      subtitle="برای سنجش عملکرد شعبه در جذب شرکت‌های جدید"
    >
      <Table<ContractsByMonth>
        rowKey="month"
        columns={columns}
        dataSource={data}
        loading={isFetching}
        locale={{ emptyText: 'هنوز تفاهم‌نامه‌ای ثبت نشده است.' }}
      />
    </PanelCard>
  );
};
