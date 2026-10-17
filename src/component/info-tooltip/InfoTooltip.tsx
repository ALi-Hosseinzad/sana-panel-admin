import { InfoCircleFilled } from '@ant-design/icons';
import { Tooltip, type TooltipProps } from 'antd';
import { type ReactNode } from 'react';

export interface InfoTooltipProps extends Omit<TooltipProps, 'title'> {
  content: ReactNode;
}

/** آیکون «i» که با نگه داشتن ماوس توضیح نشان می‌دهد */
export const InfoTooltip = ({ content, placement = 'top', ...rest }: InfoTooltipProps) => (
  <Tooltip title={content} placement={placement} {...rest}>
    <InfoCircleFilled
      aria-label="توضیحات"
      className="mx-1.5 cursor-help align-middle text-[15px] text-[var(--sana-primary-hover)]"
    />
  </Tooltip>
);
