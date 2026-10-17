import { useQuery } from '@tanstack/react-query';

import { Form, FormItem } from '@/component/form';
import { SelectInput } from '@/component/input';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { getNoGrantReasons, getPostApprovalStages } from '@/services/lookup';

/** مرحله پس از تأیید (داخل مودال تأیید)؛ برای «عدم اعطای تسهیلات غیرحضوری» علت هم لازم است */
export const PostStageFields = () => {
  const stageId = Form.useWatch<string | undefined>('stageId');

  const { data: stages, isPending } = useQuery({
    queryKey: QUERY_KEYS.LOOKUPS.POST_APPROVAL_STAGES,
    queryFn: getPostApprovalStages,
  });
  const needsReason = Boolean(stages?.find((stage) => stage.id === stageId)?.requiresReason);

  const { data: reasons, isPending: reasonsPending } = useQuery({
    queryKey: QUERY_KEYS.LOOKUPS.NO_GRANT_REASONS,
    queryFn: getNoGrantReasons,
    enabled: needsReason,
  });

  return (
    <>
      <FormItem name="stageId" label="مرحله پس از تأیید" required>
        <SelectInput
          loading={isPending}
          options={stages?.map((stage) => ({ value: stage.id, label: stage.title }))}
        />
      </FormItem>
      {needsReason && (
        <FormItem
          name="noGrantReasonId"
          label="علت عدم اعطای تسهیلات غیرحضوری"
          required
          requiredMessage="انتخاب علت اجباری است."
        >
          <SelectInput
            loading={reasonsPending}
            options={reasons?.map((reason) => ({ value: reason.id, label: reason.title }))}
          />
        </FormItem>
      )}
    </>
  );
};
