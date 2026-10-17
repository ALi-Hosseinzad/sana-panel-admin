import { UploadOutlined } from '@ant-design/icons';
import { Upload, type UploadProps } from 'antd';
import { type ReactNode } from 'react';

import { Button, type ButtonProps } from '../button';

export interface UploadButtonProps {
  /** فایل انتخاب‌شده (آپلود خودکار انجام نمی‌شود) */
  onSelect: (file: File) => void;
  accept?: string;
  children?: ReactNode;
  variant?: NonNullable<ButtonProps['variant']>;
  size?: NonNullable<ButtonProps['size']>;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  uploadProps?: Omit<UploadProps, 'beforeUpload' | 'accept'>;
}

/** دکمه انتخاب فایل (مثل آپلود اکسل) */
export const UploadButton = ({
  onSelect,
  accept,
  children = 'انتخاب فایل',
  variant = 'secondary',
  size,
  disabled,
  loading,
  block,
  uploadProps,
}: UploadButtonProps) => (
  <Upload
    accept={accept}
    showUploadList={false}
    maxCount={1}
    disabled={disabled}
    beforeUpload={(file) => {
      onSelect(file);
      return false;
    }}
    {...uploadProps}
  >
    <Button variant={variant} size={size} icon={<UploadOutlined />} loading={loading} block={block}>
      {children}
    </Button>
  </Upload>
);
