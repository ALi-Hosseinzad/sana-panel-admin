import { useQuery } from '@tanstack/react-query';

import { NoticeCard } from '@/component/card';
import { Skeleton } from '@/component/loading';
import { QUERY_KEYS } from '@/constant/queryKeys';

import { getEligibility } from '../api';

interface EligibilityNoticesProps {
  companyId: string;
  date: string;
}

/** پیام‌های مجاز بودن شرکت برای ثبت درخواست (از سرویس) */
export const EligibilityNotices = ({ companyId, date }: EligibilityNoticesProps) => {
  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.CREDIT.ELIGIBILITY(companyId, date),
    queryFn: () => getEligibility(companyId, date),
  });

  if (isPending) return <Skeleton variant="panel" rows={1} />;

  return (
    <div className="mt-2">
      {data?.messages.map((message) => (
        <NoticeCard key={message.text} type={message.type}>
          {message.text}
        </NoticeCard>
      ))}
    </div>
  );
};
