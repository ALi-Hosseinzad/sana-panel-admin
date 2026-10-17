import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/component/button';
import { PanelCard } from '@/component/card';
import { Table } from '@/component/table';
import { type LookupApi, type LookupBody } from '@/services/lookup';
import { type LookupItem } from '@/types/common';

import { LookupItemModal } from './LookupItemModal';

interface LookupListCardProps {
  title: string;
  subtitle: string;
  /** نام هر آیتم برای عنوان دکمه‌ها و مودال (مثلاً «دلیل» یا «نوع مستند») */
  itemLabel: string;
  queryKey: readonly string[];
  api: LookupApi;
}

/** کارت یک لیست ساده با سرویس‌های لیست، افزودن، ویرایش و حذف */
export const LookupListCard = ({
  title,
  subtitle,
  itemLabel,
  queryKey,
  api,
}: LookupListCardProps) => {
  const queryClient = useQueryClient();
  const { modal } = App.useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<LookupItem | null>(null);

  const { data, isFetching } = useQuery({ queryKey, queryFn: api.list });

  const refresh = (message: string) => {
    void queryClient.invalidateQueries({ queryKey });
    toast.success(message);
  };

  const { mutateAsync: save } = useMutation({
    mutationFn: (body: LookupBody) => (editing ? api.update(editing.id, body) : api.create(body)),
    onSuccess: () => refresh(editing ? `${itemLabel} ویرایش شد.` : `${itemLabel} اضافه شد.`),
  });

  const { mutate: remove } = useMutation({
    mutationFn: api.remove,
    onSuccess: () => refresh(`${itemLabel} حذف شد.`),
  });

  const openModal = (item: LookupItem | null) => {
    setEditing(item);
    setModalOpen(true);
  };

  const confirmDelete = (item: LookupItem) =>
    modal.confirm({
      title: `حذف «${item.title}»`,
      okText: 'حذف',
      okButtonProps: { danger: true },
      cancelText: 'انصراف',
      onOk: () => remove(item.id),
    });

  const columns: ColumnsType<LookupItem> = [
    { title: 'عنوان', dataIndex: 'title' },
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
            onClick={() => openModal(row)}
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
      title={title}
      subtitle={subtitle}
      extra={
        <Button
          variant="outline"
          size="small"
          icon={<PlusOutlined />}
          onClick={() => openModal(null)}
        >
          افزودن {itemLabel}
        </Button>
      }
    >
      <Table<LookupItem> columns={columns} dataSource={data} loading={isFetching} showRowNumber />
      <LookupItemModal
        open={modalOpen}
        item={editing}
        itemLabel={itemLabel}
        onSubmit={save}
        onClose={() => setModalOpen(false)}
      />
    </PanelCard>
  );
};
