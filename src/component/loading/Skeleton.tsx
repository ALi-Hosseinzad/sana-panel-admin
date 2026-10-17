import { Skeleton as AntSkeleton } from 'antd';

export type SkeletonVariant = 'panel' | 'kpi' | 'table' | 'form';

export interface SkeletonProps {
  /** شکل کادر: پنل / کارت آماری / جدول / فرم */
  variant?: SkeletonVariant;
  /** تعداد تکرار (برای kpi در یک ردیف چیده می‌شوند) */
  count?: number;
  /** تعداد خطوط/ردیف‌ها */
  rows?: number;
  active?: boolean;
}

const BOX = 'rounded-panel border border-line bg-panel shadow-panel';

const PanelSkeleton = ({ rows, active }: { rows: number; active: boolean }) => (
  <div className={`${BOX} px-6 py-[22px]`}>
    <AntSkeleton active={active} title={{ width: '35%' }} paragraph={{ rows }} />
  </div>
);

const KpiSkeleton = ({ active }: { active: boolean }) => (
  <div className={`${BOX} relative overflow-hidden px-[18px] pt-4 pb-3.5`}>
    <div className="absolute inset-x-0 top-0 h-[3px] bg-line" />
    <AntSkeleton active={active} title={{ width: '55%' }} paragraph={{ rows: 1, width: '40%' }} />
  </div>
);

const TableSkeleton = ({ rows, active }: { rows: number; active: boolean }) => (
  <div className="overflow-hidden rounded-xl border border-line bg-panel">
    <div className="bg-[var(--sana-table-head)] px-3.5 py-3">
      <AntSkeleton.Input active={active} size="small" block />
    </div>
    {Array.from({ length: rows }, (_, index) => (
      <div key={index} className="border-t border-line-2 px-3.5 py-2.5">
        <AntSkeleton.Input active={active} size="small" block />
      </div>
    ))}
  </div>
);

const FormSkeleton = ({ rows, active }: { rows: number; active: boolean }) => (
  <div className={`${BOX} grid grid-cols-1 gap-4 px-6 py-[22px] md:grid-cols-2 xl:grid-cols-3`}>
    {Array.from({ length: rows }, (_, index) => (
      <div key={index} className="flex flex-col gap-2">
        <AntSkeleton.Input active={active} size="small" style={{ width: 120 }} />
        <AntSkeleton.Input active={active} block />
      </div>
    ))}
  </div>
);

/** اسکلتون‌های کادردار هم‌شکل با کامپوننت‌های پروژه */
export const Skeleton = ({ variant = 'panel', count = 1, rows, active = true }: SkeletonProps) => {
  const items = Array.from({ length: count }, (_, index) => index);

  if (variant === 'kpi') {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
        {items.map((index) => (
          <KpiSkeleton key={index} active={active} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[18px]">
      {items.map((index) => {
        if (variant === 'table')
          return <TableSkeleton key={index} rows={rows ?? 5} active={active} />;
        if (variant === 'form')
          return <FormSkeleton key={index} rows={rows ?? 6} active={active} />;
        return <PanelSkeleton key={index} rows={rows ?? 3} active={active} />;
      })}
    </div>
  );
};
