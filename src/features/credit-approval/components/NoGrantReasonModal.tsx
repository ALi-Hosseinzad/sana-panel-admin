import { useQuery } from '@tanstack/react-query';

import { FormItem } from '@/component/form';
import { SelectInput } from '@/component/input';
import { FormModal } from '@/component/modal';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { getNoGrantReasons } from '@/services/lookup';

interface NoGrantReasonModalProps {
  open: boolean;
  staffName?: string;
  onSubmit: (reasonId: string) => Promise<unknown>;
  onClose: () => void;
}

/** انتخاب علت عدم اعطای تسهیلات غیرحضوری (اجباری) */
export const NoGrantReasonModal = ({
  open,
  staffName,
  onSubmit,
  onClose,
}: NoGrantReasonModalProps) => {
  const { data: reasons, isPending } = useQuery({
    queryKey: QUERY_KEYS.LOOKUPS.NO_GRANT_REASONS,
    queryFn: getNoGrantReasons,
    enabled: open,
  });

  return (
    <FormModal<{ reasonId: string }>
      title="عدم اعطای تسهیلات غیرحضوری"
      okText="ثبت مرحله"
      open={open}
      onCancel={onClose}
      onSubmit={({ reasonId }) => onSubmit(reasonId)}
    >
      {staffName && <p className="mt-0 mb-4 text-[12.5px] text-ink-soft">{staffName}</p>}
      <FormItem
        name="reasonId"
        label="علت عدم اعطای تسهیلات غیرحضوری"
        required
        requiredMessage="انتخاب علت اجباری است؛ بدون آن وضعیت تغییر نمی‌کند."
      >
        <SelectInput
          loading={isPending}
          options={reasons?.map((reason) => ({ value: reason.id, label: reason.title }))}
        />
      </FormItem>
    </FormModal>
  );
};
