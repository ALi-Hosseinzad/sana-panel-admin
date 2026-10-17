import { type ReactNode } from 'react';

import { Typography } from '../typography';

export interface PanelCardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** دکمه‌ها/اکشن‌های کنار عنوان */
  extra?: ReactNode;
  children?: ReactNode;
  /** نمایش نوار طلایی کنار عنوان */
  accent?: boolean;
  className?: string;
  bodyClassName?: string;
}

/** کارت اصلی بخش‌ها (panel در طراحی) */
export const PanelCard = ({
  title,
  subtitle,
  extra,
  children,
  accent = true,
  className,
  bodyClassName,
}: PanelCardProps) => (
  <section
    className={[
      'mb-[18px] rounded-panel border border-line bg-panel px-6 py-[22px] shadow-panel',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {(title ?? extra) && (
      <header className="mb-1 flex flex-wrap items-center justify-between gap-2.5">
        {title && (
          <div className="flex items-center gap-2.5">
            {accent && <span className="h-[18px] w-1 flex-none rounded-[3px] bg-accent" />}
            <Typography as="title" level={2} size="lg" color="heading">
              {title}
            </Typography>
          </div>
        )}
        {extra && <div className="flex flex-wrap items-center gap-2">{extra}</div>}
      </header>
    )}
    {subtitle && (
      <Typography as="paragraph" size="sm" weight={400} color="soft" className="mb-4">
        {subtitle}
      </Typography>
    )}
    <div className={bodyClassName}>{children}</div>
  </section>
);
