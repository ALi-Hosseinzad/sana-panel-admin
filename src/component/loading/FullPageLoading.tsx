import { Spin } from 'antd';

import logo from '@/assets/images/logo-sana.png';

export interface FullPageLoadingProps {
  tip?: string;
}

/** لودینگ تمام صفحه (روی همه محتوا) */
export const FullPageLoading = ({ tip = 'در حال بارگذاری...' }: FullPageLoadingProps) => (
  <div
    role="status"
    aria-live="polite"
    className="fixed inset-0 z-[2000] flex flex-col items-center justify-center gap-5 bg-bg/90 backdrop-blur-sm"
  >
    <span className="inline-flex size-[76px] items-center justify-center rounded-2xl bg-white p-2 shadow-[0_6px_18px_rgba(0,0,0,.18)]">
      <img src={logo} alt="سانا" className="h-full w-auto object-contain" />
    </span>
    <Spin size="large" />
    <span className="text-[13px] text-ink-soft">{tip}</span>
  </div>
);
