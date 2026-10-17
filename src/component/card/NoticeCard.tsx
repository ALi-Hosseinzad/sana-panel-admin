import {
  BulbOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { type ReactNode } from 'react';

export type NoticeType = 'success' | 'error' | 'warning' | 'suggestion';

export interface NoticeCardProps {
  type?: NoticeType;
  title?: ReactNode;
  children?: ReactNode;
  /** نمایش آیکون */
  showIcon?: boolean;
  className?: string;
}

const STYLE: Record<NoticeType, string> = {
  success: 'border-success-border border-r-success bg-success-bg text-success-text',
  error: 'border-danger-border border-r-danger bg-danger-bg text-danger-text',
  warning: 'border-gold-soft-border border-r-warning bg-warning-bg text-warning-text',
  suggestion: 'border-gold-soft-border border-r-accent bg-gold-soft text-gold-soft-text',
};

const ICON: Record<NoticeType, ReactNode> = {
  success: <CheckCircleOutlined />,
  error: <CloseCircleOutlined />,
  warning: <ExclamationCircleOutlined />,
  suggestion: <BulbOutlined />,
};

/** کادر پیام (banner / suggestion در طراحی) */
export const NoticeCard = ({
  type = 'suggestion',
  title,
  children,
  showIcon = true,
  className,
}: NoticeCardProps) => (
  <div
    role={type === 'error' ? 'alert' : 'status'}
    className={[
      'mb-3 flex gap-2.5 rounded-xl border border-r-4 px-4 py-[13px] text-[13px] font-medium',
      STYLE[type],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {showIcon && <span className="mt-0.5 text-base leading-none">{ICON[type]}</span>}
    <div className="min-w-0 flex-1">
      {title && <div className="mb-0.5 font-bold">{title}</div>}
      {children}
    </div>
  </div>
);
