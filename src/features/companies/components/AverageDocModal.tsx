import { useQuery } from '@tanstack/react-query';

import { FormItem } from '@/component/form';
import { FileInput, SelectInput, TextAreaInput } from '@/component/input';
import { FormModal } from '@/component/modal';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { getAvgDocTypes } from '@/services/lookup';
import { toPersianDigits } from '@/utils/date';

import { type AverageDocFormValues } from '../types';

interface AverageDocModalProps {
  open: boolean;
  /** ماه‌هایی که تغییر کرده‌اند */
  months: number[];
  onSubmit: (values: AverageDocFormValues) => Promise<unknown>;
  onClose: () => void;
}

/** برای ثبت میانگین، انتخاب نوع مستند و بارگذاری فایل آن اجباری است */
export const AverageDocModal = ({ open, months, onSubmit, onClose }: AverageDocModalProps) => {
  const { data: docTypes, isPending } = useQuery({
    queryKey: QUERY_KEYS.LOOKUPS.AVG_DOC_TYPES,
    queryFn: getAvgDocTypes,
    enabled: open,
  });

  return (
    <FormModal<AverageDocFormValues>
      title="مستند میانگین موجودی"
      okText="ثبت میانگین و مستند"
      open={open}
      onCancel={onClose}
      onSubmit={onSubmit}
    >
      <p className="mt-0 mb-4 text-[12.5px] text-ink-soft">
        ماه‌های تغییر یافته: {toPersianDigits(months.join('، '))}
      </p>
      <FormItem name="docTypeId" label="نوع مستند" required>
        <SelectInput
          loading={isPending}
          options={docTypes?.map((type) => ({ value: type.id, label: type.title }))}
        />
      </FormItem>
      <FormItem
        name="file"
        label="فایل مستند"
        required
        requiredMessage="بارگذاری فایل مستند اجباری است."
      >
        <FileInput />
      </FormItem>
      <FormItem name="note" label="توضیحات (اختیاری)">
        <TextAreaInput maxLength={500} />
      </FormItem>
    </FormModal>
  );
};
