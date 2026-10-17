import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { toast } from 'sonner';

import { Button } from '@/component/button';
import { PanelCard } from '@/component/card';
import { Table } from '@/component/table';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { toPersianDigits } from '@/utils/date';

import { deleteScheme, getSchemes } from '../api';
import { type SchemeListItem } from '../types';

interface SchemeTableProps {
  onCreate: () => void;
  onEdit: (id: string) => void;
}

const joinNumbers = (values: number[]) =>
  values.length ? toPersianDigits(values.join('، ')) : '—';

/** جدول طرح‌ها با دکمه‌های ایجاد، ویرایش و حذف */
export const SchemeTable = ({ onCreate, onEdit }: SchemeTableProps) => {
  const queryClient = useQueryClient();
  const { modal } = App.useApp();

  const { data, isFetching } = useQuery({
    queryKey: QUERY_KEYS.BASE_INFO.SCHEMES,
    queryFn: getSchemes,
  });

  const { mutateAsync: remove } = useMutation({
    mutationFn: deleteScheme,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BASE_INFO.SCHEMES });
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LOOKUPS.PLANS });
      toast.success('طرح حذف شد.');
    },
  });

  const confirmDelete = (scheme: SchemeListItem) =>
    modal.confirm({
      title: `حذف طرح «${scheme.name}»`,
      content: 'اطلاعات پایه این طرح حذف می‌شود. آیا مطمئن هستید؟',
      okText: 'حذف',
      okButtonProps: { danger: true },
      cancelText: 'انصراف',
      onOk: () => remove(scheme.id),
    });

  const columns: ColumnsType<SchemeListItem> = [
    { title: 'نام طرح', dataIndex: 'name' },
    {
      title: 'نرخ قرض‌الحسنه (درصد)',
      dataIndex: 'qarzRate',
      align: 'center',
      render: (value: number) => toPersianDigits(value),
    },
    {
      title: 'نرخ‌های مرابحه (درصد)',
      dataIndex: 'murabahaRates',
      render: joinNumbers,
    },
    { title: 'مدت‌های بازپرداخت (ماه)', dataIndex: 'terms', render: joinNumbers },
    {
      title: 'مدت قرارداد (سال)',
      dataIndex: 'contractYears',
      align: 'center',
      render: (value: number) => toPersianDigits(value),
    },
    {
      title: 'حداکثر طرح هر شرکت',
      dataIndex: 'maxPlans',
      align: 'center',
      render: (value: number) => toPersianDigits(value),
    },
    {
      title: 'عملیات',
      key: 'actions',
      width: 200,
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
      title="طرح‌ها"
      subtitle="اطلاعات پایه هر طرح (نرخ‌ها، مدت‌ها و جدول درصد قابل استفاده) از طریق دکمه ویرایش همان طرح قابل تغییر است."
      extra={
        <Button variant="outline" size="small" icon={<PlusOutlined />} onClick={onCreate}>
          ایجاد طرح
        </Button>
      }
    >
      <Table<SchemeListItem>
        columns={columns}
        dataSource={data}
        loading={isFetching}
        showRowNumber
        locale={{ emptyText: 'هنوز طرحی ایجاد نشده است.' }}
      />
    </PanelCard>
  );
};
