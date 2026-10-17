import { Typography } from '@/component/typography';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="mt-6 mb-3">
    <Typography as="title" level={3} size="md" color="heading">
      {title}
    </Typography>
    {subtitle && (
      <Typography as="paragraph" size="sm" weight={400} color="soft">
        {subtitle}
      </Typography>
    )}
  </div>
);
