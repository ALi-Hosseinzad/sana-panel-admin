import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { SelectInput } from '@/component/input';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { getPostApprovalStages } from '@/services/lookup';

import { updatePostStage } from '../api';
import { type CreditApprovalItem } from '../types';

import { NoGrantReasonModal } from './NoGrantReasonModal';

/** مرحله پس از تأیید؛ مرحله‌ای که علت می‌خواهد ابتدا مودال انتخاب علت را باز می‌کند */
export const PostStageSelect = ({ request }: { request: CreditApprovalItem }) => {
  const queryClient = useQueryClient();
  const [pendingStageId, setPendingStageId] = useState<string | null>(null);
  // با انصراف از مودال علت، سلکت دوباره ساخته می‌شود تا مقدار قبلی (سمت سرور) نمایش داده شود
  const [resetKey, setResetKey] = useState(0);

  const { data: stages, isPending } = useQuery({
    queryKey: QUERY_KEYS.LOOKUPS.POST_APPROVAL_STAGES,
    queryFn: getPostApprovalStages,
  });

  const { mutateAsync, isPending: isSaving } = useMutation({
    mutationFn: (payload: { stageId: string | null; noGrantReasonId?: string }) =>
      updatePostStage(request.id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CREDIT_APPROVALS.ALL });
      toast.success(`مرحله پس از تأیید برای «${request.staffName}» به‌روزرسانی شد.`);
    },
  });

  const handleChange = (stageId?: string) => {
    const stage = stages?.find((item) => item.id === stageId);
    if (stage?.requiresReason) {
      setPendingStageId(stage.id);
      return;
    }
    void mutateAsync({ stageId: stageId ?? null });
  };

  return (
    <>
      <SelectInput
        key={resetKey}
        size="small"
        style={{ minWidth: 210 }}
        placeholder="— انتخاب کنید —"
        loading={isPending || isSaving}
        value={request.postStageId}
        onChange={handleChange}
        options={stages?.map((stage) => ({ value: stage.id, label: stage.title }))}
      />
      <NoGrantReasonModal
        open={Boolean(pendingStageId)}
        staffName={request.staffName}
        onSubmit={(reasonId) => mutateAsync({ stageId: pendingStageId, noGrantReasonId: reasonId })}
        onClose={() => {
          setPendingStageId(null);
          setResetKey((value) => value + 1);
        }}
      />
    </>
  );
};
