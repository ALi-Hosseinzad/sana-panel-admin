import { Skeleton } from 'antd';
import { type ReactNode } from 'react';

import { Typography } from '../typography';

export interface KpiCardProps {
  label: ReactNode;
  value: ReactNode;
  /** رنگ عدد */
  tone?: 'default' | 'amber' | 'success' | 'danger';
  icon?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
}

const TONE_COLOR = {
  default: 'heading',
  amber: 'amber',
  success: 'success',
  danger: 'danger',
} as const;

/** کارت آماری با خط گرادیانت طلایی بالای آن */
export const KpiCard = ({
  label,
  value,
  tone = 'default',
  icon,
  footer,
  loading,
}: KpiCardProps) => (
  <div className="relative overflow-hidden rounded-panel border border-line bg-panel px-[18px] pt-4 pb-3.5 shadow-soft">
    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-accent to-accent-light" />
    <div className="mb-2 flex items-center justify-between gap-2">
      <Typography size="sm" color="soft">
        {label}
      </Typography>
      {icon && <span className="text-lg text-accent">{icon}</span>}
    </div>
    {loading ? (
      <Skeleton.Input active size="small" />
    ) : (
      <Typography size="xl" color={TONE_COLOR[tone]}>
        {value}
      </Typography>
    )}
    {footer && <div className="mt-1.5 text-xs text-ink-soft">{footer}</div>}
  </div>
);
