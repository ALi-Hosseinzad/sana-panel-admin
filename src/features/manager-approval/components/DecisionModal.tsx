import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { FormItem } from '@/component/form';
import { FileInput, TextAreaInput } from '@/component/input';
import { FormModal } from '@/component/modal';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { resolveFile } from '@/services/file';
import { toPersianDigits } from '@/utils/date';
import { formatRial } from '@/utils/number';
import { rialToTomanWords } from '@/utils/numberToWords';

import { submitDecision } from '../api';
import { type DecisionFormValues, type DecisionType, type PendingRequest } from '../types';

export interface DecisionTarget {
  type: DecisionType;
  requests: PendingRequest[];
}

interface DecisionModalProps {
  companyId: string;
  target: DecisionTarget | null;
  onClose: () => void;
  onDone: () => void;
}

const describe = (requests: PendingRequest[]) => {
  const [first] = requests;
  if (requests.length > 1 || !first)
    return `${toPersianDigits(requests.length)} درخواست انتخاب‌شده`;
  return `${first.staffName} — ${first.planTitle} — ${formatRial(first.amount)} (${rialToTomanWords(first.amount)})`;
};

/** ثبت تصمیم مدیر شرکت (تأیید / رد) برای یک یا چند درخواست */
export const DecisionModal = ({ companyId, target, onClose, onDone }: DecisionModalProps) => {
  const queryClient = useQueryClient();
  const isReject = target?.type === 'reject';
  const isGroup = (target?.requests.length ?? 0) > 1;

  const { mutateAsync } = useMutation({
    mutationFn: async ({ file, note }: DecisionFormValues) => {
      const uploaded = await resolveFile(file);
      return submitDecision(target?.type ?? 'approve', companyId, {
        requestIds: target?.requests.map((item) => item.id) ?? [],
        note,
        fileId: uploaded?.id ?? null,
      });
    },
    onSuccess: ({ updated }) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MANAGER_APPROVALS.ALL });
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CREDIT.ALL });
      onDone();
      toast.success(
        `${toPersianDigits(updated)} درخواست ${isReject ? 'رد شد' : 'تأیید و به مرحله تأیید اعتبارات ارسال شد'}.`,
      );
    },
  });

  return (
    <FormModal<DecisionFormValues>
      title={`${isReject ? 'رد' : 'تأیید'} ${isGroup ? 'گروهی درخواست‌ها' : 'درخواست'}`}
      okText="ثبت تصمیم"
      okButtonProps={{ danger: isReject }}
      open={Boolean(target)}
      onCancel={onClose}
      onSubmit={mutateAsync}
    >
      <p className="mt-0 mb-4 text-[12.5px] text-ink-soft">
        {target ? describe(target.requests) : ''}
      </p>
      <FormItem name="note" label="توضیحات (اختیاری)">
        <TextAreaInput maxLength={500} />
      </FormItem>
      <FormItem name="file" label="الصاق مستندات (اختیاری)">
        <FileInput />
      </FormItem>
    </FormModal>
  );
};
