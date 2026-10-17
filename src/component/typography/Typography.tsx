import { Typography as AntTypography } from 'antd';
import { type CSSProperties, type ReactNode } from 'react';

import { TYPOGRAPHY_SCALE, type TypographySize } from '@/theme/typography';

export type TypographyColor =
  | 'default'
  | 'soft'
  | 'heading'
  | 'label'
  | 'accent'
  | 'amber'
  | 'success'
  | 'warning'
  | 'danger'
  | 'inherit';

const COLOR_VAR: Record<TypographyColor, string> = {
  default: 'var(--sana-ink)',
  soft: 'var(--sana-ink-soft)',
  heading: 'var(--sana-heading)',
  label: 'var(--sana-label)',
  accent: 'var(--sana-accent)',
  amber: 'var(--sana-amber)',
  success: 'var(--sana-success)',
  warning: 'var(--sana-warning)',
  danger: 'var(--sana-danger)',
  inherit: 'inherit',
};

export interface TypographyProps {
  children?: ReactNode;
  /** xl = 20/800 · lg = 16/800 · md = 13.5/700 · sm = 12/600 */
  size?: TypographySize;
  /** بازنویسی وزن پیش‌فرض اندازه */
  weight?: CSSProperties['fontWeight'];
  color?: TypographyColor;
  /** `text` برای متن خطی، `paragraph` برای پاراگراف، `title` برای تیتر (h1..h5) */
  as?: 'text' | 'paragraph' | 'title';
  level?: 1 | 2 | 3 | 4 | 5;
  align?: CSSProperties['textAlign'];
  ellipsis?: boolean;
  copyable?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Typography = ({
  children,
  size = 'md',
  weight,
  color = 'default',
  as = 'text',
  level = 4,
  align,
  ellipsis,
  copyable,
  className,
  style,
}: TypographyProps) => {
  const scale = TYPOGRAPHY_SCALE[size];
  const mergedStyle: CSSProperties = {
    fontSize: scale.fontSize,
    fontWeight: weight ?? scale.fontWeight,
    lineHeight: scale.lineHeight,
    color: COLOR_VAR[color],
    textAlign: align,
    margin: 0,
    ...style,
  };
  const shared = { className, style: mergedStyle, ellipsis, copyable };

  if (as === 'title') {
    return (
      <AntTypography.Title level={level} {...shared}>
        {children}
      </AntTypography.Title>
    );
  }
  if (as === 'paragraph')
    return <AntTypography.Paragraph {...shared}>{children}</AntTypography.Paragraph>;
  return <AntTypography.Text {...shared}>{children}</AntTypography.Text>;
};
