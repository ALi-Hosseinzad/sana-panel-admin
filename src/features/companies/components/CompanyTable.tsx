import { DeleteOutlined, EditOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/component/button';
import { PanelCard } from '@/component/card';
import { StatusChip } from '@/component/status-chip';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { formatJalali, toPersianDigits } from '@/utils/date';

import { deleteCompany, getCompanies } from '../api';
import { COMPANY_STATUS, type CompanyListItem, type CompanyStatus } from '../types';

interface CompanyTableProps {
  onCreate: () => void;
  onEdit: (id: string) => void;
  onCancelContract: (company: CompanyListItem) => void;
}

const PAGE_SIZE = 10;

const STATUS_LABELS: Record<CompanyStatus, string> = {
  [COMPANY_STATUS.ACTIVE]: 'فعال (تمدید خودکار فعال)',
  [COMPANY_STATUS.CANCELLED]: 'لغوشده',
  [COMPANY_STATUS.EXPIRED]: 'منقضی‌شده',
  [COMPANY_STATUS.DELETED]: 'حذف‌شده',
};

const renderStatus = (company: CompanyListItem) => (
  <StatusChip tone={company.status === COMPANY_STATUS.ACTIVE ? 'success' : 'error'}>
    {STATUS_LABELS[company.status]}
  </StatusChip>
);

export const CompanyTable = ({ onCreate, onEdit, onCancelContract }: CompanyTableProps) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { modal } = App.useApp();

  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.COMPANIES.LIST(page, PAGE_SIZE),
    queryFn: () => getCompanies({ page, pageSize: PAGE_SIZE }),
  });

  const { mutate: remove } = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMPANIES.ALL });
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOOKUPS.COMPANIES });
      toast.success('شرکت حذف شد.');
    },
  });

  const confirmDelete = (company: CompanyListItem) =>
    modal.confirm({
      title: `حذف شرکت «${company.name}»`,
      content:
        'اطلاعات این شرکت برای گزارش‌گیری نگه داشته می‌شود و در لیست‌های فعال دیگر نمایش داده نمی‌شود.',
      okText: 'حذف',
      okButtonProps: { danger: true },
      cancelText: 'انصراف',
      onOk: () => remove(company.id),
    });

  const columns: ColumnsType<CompanyListItem> = [
    { title: 'نام شرکت', dataIndex: 'name' },
    { title: 'شناسه ملی', dataIndex: 'nationalId' },
    { title: 'شماره تفاهم‌نامه', dataIndex: 'agreementNo' },
    {
      title: 'تاریخ قرارداد',
      dataIndex: 'contractDate',
      render: (value: string) => formatJalali(value, undefined, { persianDigits: true }),
    },
    {
      title: 'تعداد طرح',
      dataIndex: 'planCount',
      align: 'center',
      render: (value: number) => toPersianDigits(value),
    },
    { title: 'ثبت‌کننده', dataIndex: 'registeredBy', className: 'text-[11.5px]' },
    { title: 'وضعیت قرارداد', key: 'status', render: (_value, row) => renderStatus(row) },
    {
      title: 'عملیات',
      key: 'actions',
      render: (_value, row) => (
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="small"
            icon={<EditOutlined />}
            onClick={() => onEdit(row.id)}
          >
            ویرایش
          </Button>
          {row.status === COMPANY_STATUS.ACTIVE && (
            <Button
              variant="secondary"
              size="small"
              icon={<StopOutlined />}
              onClick={() => onCancelContract(row)}
            >
              لغو قرارداد
            </Button>
          )}
          <Button
            variant="secondary"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => confirmDelete(row)}
          >
            حذف
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PanelCard
      title="فهرست شرکت‌های ثبت‌شده"
      extra={
        <Button variant="outline" size="small" icon={<PlusOutlined />} onClick={onCreate}>
          ثبت شرکت
        </Button>
      }
    >
      <Table<CompanyListItem>
        columns={columns}
        dataSource={data?.items}
        loading={isFetching}
        showRowNumber
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total: data?.total ?? 0,
          onChange: setPage,
        }}
      />
    </PanelCard>
  );
};
