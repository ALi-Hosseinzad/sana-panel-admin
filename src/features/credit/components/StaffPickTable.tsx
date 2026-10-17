import { useQuery } from '@tanstack/react-query';
import { type ColumnsType } from 'antd/es/table';

import { FormItem } from '@/component/form';
import { AmountInput, NumberInput } from '@/component/input';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { getStaffList } from '@/features/staff/api';
import { type Staff, type StaffFilters } from '@/features/staff/types';
import { toPersianDigits } from '@/utils/date';

interface StaffPickTableProps {
  companyId: string;
  filters: StaffFilters;
  variableAmount: boolean;
  disabled: boolean;
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
}

/** همه پرسنل (بدون صفحه‌بندی) برای انتخاب در درخواست وام */
const ALL = { page: 1, pageSize: 1000 };

export const StaffPickTable = ({
  companyId,
  filters,
  variableAmount,
  disabled,
  selectedIds,
  onSelect,
}: StaffPickTableProps) => {
  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.STAFF.LIST(companyId, filters, 0),
    queryFn: () => getStaffList(companyId, { ...filters, ...ALL }),
  });

  const columns: ColumnsType<Staff> = [
    {
      title: 'اولویت پرسنل',
      dataIndex: 'priority',
      align: 'center',
      render: (value: number) => <b>{toPersianDigits(value)}</b>,
    },
    { title: 'نام', dataIndex: 'fullName' },
    { title: 'کد پرسنلی', dataIndex: 'personnelCode' },
    {
      title: 'ترتیب پرداخت',
      key: 'paymentOrder',
      render: (_value, row, index) => (
        <FormItem name={['rows', row.id, 'paymentOrder']} initialValue={index + 1} noStyle>
          <NumberInput min={1} style={{ width: 80 }} />
        </FormItem>
      ),
    },
    ...(variableAmount
      ? [
          {
            title: 'مبلغ وام این نفر',
            key: 'amount',
            render: (_value: unknown, row: Staff) => (
              <FormItem name={['rows', row.id, 'amount']} noStyle>
                <AmountInput style={{ width: 200 }} />
              </FormItem>
            ),
          },
        ]
      : []),
  ];

  return (
    <Table<Staff>
      columns={columns}
      dataSource={data?.items}
      loading={isFetching}
      maxHeight={300}
      locale={{ emptyText: 'پرسنلی با این شرایط یافت نشد.' }}
      rowSelection={{
        selectedRowKeys: selectedIds,
        onChange: (keys) => onSelect(keys.map(String)),
        getCheckboxProps: () => ({ disabled }),
      }}
    />
  );
};
