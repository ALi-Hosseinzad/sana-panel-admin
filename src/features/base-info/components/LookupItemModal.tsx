import { FormItem } from '@/component/form';
import { TextInput } from '@/component/input';
import { FormModal } from '@/component/modal';
import { type LookupBody } from '@/services/lookup';
import { type LookupItem } from '@/types/common';

interface LookupItemModalProps {
  open: boolean;
  /** آیتم در حال ویرایش؛ خالی = افزودن */
  item: LookupItem | null;
  itemLabel: string;
  onSubmit: (values: LookupBody) => Promise<unknown>;
  onClose: () => void;
}

export const LookupItemModal = ({
  open,
  item,
  itemLabel,
  onSubmit,
  onClose,
}: LookupItemModalProps) => (
  <FormModal<LookupBody>
    title={item ? `ویرایش ${itemLabel}` : `افزودن ${itemLabel}`}
    okText={item ? 'ذخیره تغییرات' : 'افزودن'}
    open={open}
    initialValues={item ?? undefined}
    onSubmit={onSubmit}
    onCancel={onClose}
  >
    <FormItem
      name="title"
      label="عنوان"
      required
      rules={[{ whitespace: true, message: 'عنوان الزامی است.' }]}
    >
      <TextInput maxLength={200} />
    </FormItem>
  </FormModal>
);
