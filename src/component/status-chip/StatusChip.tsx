import { type ReactNode } from 'react';

export type StatusTone = 'success' | 'warning' | 'error' | 'default';

export interface StatusChipProps {
  tone?: StatusTone;
  children: ReactNode;
  icon?: ReactNode;
}

const TONE_CLASS: Record<StatusTone, string> = {
  success: 'bg-success-bg text-success-text',
  warning: 'bg-warning-bg text-warning-text',
  error: 'bg-danger-bg text-danger-text',
  default: 'bg-line-2 text-label',
};

/** چیپ وضعیت (تأیید شده / در انتظار / رد شده ...) */
export const StatusChip = ({ tone = 'default', children, icon }: StatusChipProps) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11.5px] leading-none font-bold whitespace-nowrap ${TONE_CLASS[tone]}`}
  >
    {icon}
    {children}
  </span>
);
