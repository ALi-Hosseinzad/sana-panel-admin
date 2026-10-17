import { FormItem } from '@/component/form';
import { FileInput, SelectInput, TextAreaInput } from '@/component/input';
import { FormModal } from '@/component/modal';
import { type LookupItem } from '@/types/common';
import { toPersianDigits } from '@/utils/date';
import { formatRial } from '@/utils/number';
import { rialToTomanWords } from '@/utils/numberToWords';

import { type DecisionFormValues, type DecisionRequestInfo, type DecisionType } from '../types';

export interface DecisionTarget {
  type: DecisionType;
  requests: DecisionRequestInfo[];
}

interface DecisionModalProps {
  target: DecisionTarget | null;
  /** اگر داده شود، در حالت رد انتخاب دلیل اجباری است */
  rejectReasons?: LookupItem[];
  onSubmit: (values: DecisionFormValues) => Promise<unknown>;
  onClose: () => void;
}

const describe = (requests: DecisionRequestInfo[]) => {
  const [first] = requests;
  if (requests.length > 1 || !first)
    return `${toPersianDigits(requests.length)} درخواست انتخاب‌شده`;
  return `${first.staffName} — ${first.planTitle} — ${formatRial(first.amount)} (${rialToTomanWords(first.amount)})`;
};

/** مودال ثبت تصمیم (تأیید / رد) برای یک یا چند درخواست */
export const DecisionModal = ({ target, rejectReasons, onSubmit, onClose }: DecisionModalProps) => {
  const isReject = target?.type === 'reject';
  const isGroup = (target?.requests.length ?? 0) > 1;

  return (
    <FormModal<DecisionFormValues>
      title={`${isReject ? 'رد' : 'تأیید'} ${isGroup ? 'گروهی درخواست‌ها' : 'درخواست'}`}
      okText="ثبت تصمیم"
      okButtonProps={{ danger: isReject }}
      open={Boolean(target)}
      onCancel={onClose}
      onSubmit={onSubmit}
    >
      <p className="mt-0 mb-4 text-[12.5px] text-ink-soft">
        {target ? describe(target.requests) : ''}
      </p>
      {isReject && rejectReasons && (
        <FormItem
          name="reasonId"
          label="دلیل رد (اجباری)"
          required
          requiredMessage="انتخاب دلیل رد اجباری است."
        >
          <SelectInput
            options={rejectReasons.map((reason) => ({ value: reason.id, label: reason.title }))}
          />
        </FormItem>
      )}
      <FormItem name="note" label="توضیحات (اختیاری)">
        <TextAreaInput maxLength={500} />
      </FormItem>
      <FormItem name="file" label="الصاق مستندات (اختیاری)">
        <FileInput />
      </FormItem>
    </FormModal>
  );
};
