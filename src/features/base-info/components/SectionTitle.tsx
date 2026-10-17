interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

/** عنوان هر بخش فرم طرح */
export const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="mt-5 mb-3 border-b border-line pb-2">
    <h3 className="text-[14px] font-bold text-heading">{title}</h3>
    {subtitle && <p className="mt-1 text-[12px] text-ink-soft">{subtitle}</p>}
  </div>
);
