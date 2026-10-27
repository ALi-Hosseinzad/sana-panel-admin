import { NoticeCard } from '@/component/card';
import { Skeleton } from '@/component/loading';

import { type CompanyCredit } from '../types';

interface EligibilityNoticesProps {
  credit?: CompanyCredit;
  loading: boolean;
}

/** پیام مجاز بودن شرکت برای ثبت درخواست و پیام‌های تکمیلی (از سرویس اعتبار) */
export const EligibilityNotices = ({ credit, loading }: EligibilityNoticesProps) => {
  if (loading && !credit) return <Skeleton variant="panel" rows={1} />;
  const banner = credit?.banner;
  if (!banner) return null;
  // پیامی که همان پیام اصلی است دوباره (به‌صورت هشدار) نمایش داده نمی‌شود
  const extra = banner.messages?.filter((text) => text !== banner.message) ?? [];

  return (
    <div className="mt-2">
      {banner.message && (
        <NoticeCard type={banner.canRegisterLoan ? 'success' : 'error'}>
          {banner.message}
        </NoticeCard>
      )}
      {extra.map((text) => (
        <NoticeCard key={text} type="warning">
          {text}
        </NoticeCard>
      ))}
    </div>
  );
};
