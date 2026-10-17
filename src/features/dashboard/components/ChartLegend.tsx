import { toPersianDigits } from '@/utils/date';

export interface LegendItem {
  label: string;
  color: string;
  value?: number;
}

/** راهنمای HTML چارت (راهنمای canvas کتابخانه با متن فارسی راست‌چین به‌هم می‌ریزد) */
export const ChartLegend = ({ items }: { items: LegendItem[] }) => (
  <ul className="m-0 flex list-none flex-wrap justify-center gap-x-[18px] gap-y-2 p-0 text-[12.5px] text-label">
    {items.map((item) => (
      <li key={item.label} className="inline-flex items-center gap-1.5">
        <span aria-hidden className="size-2.5 rounded-[3px]" style={{ background: item.color }} />
        <span>{item.label}</span>
        {item.value !== undefined && <b className="text-ink">{toPersianDigits(item.value)}</b>}
      </li>
    ))}
  </ul>
);
