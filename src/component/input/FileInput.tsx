import { PaperClipOutlined } from '@ant-design/icons';

import { type UploadedFile } from '@/types/common';

import { UploadButton, type UploadButtonProps } from '../upload-button';

export type FileInputValue = File | UploadedFile | null;

export interface FileInputProps extends Omit<UploadButtonProps, 'onSelect'> {
  value?: FileInputValue;
  onChange?: (value: FileInputValue) => void;
}

/** ورودی فایل برای داخل فرم؛ مقدار: فایل جدید (File) یا فایل قبلی سرور */
export const FileInput = ({
  value,
  onChange,
  children = 'انتخاب فایل',
  ...rest
}: FileInputProps) => (
  <div className="flex flex-wrap items-center gap-3">
    <UploadButton onSelect={(file) => onChange?.(file)} {...rest}>
      {children}
    </UploadButton>
    {value && (
      <span className="inline-flex items-center gap-1 text-xs text-ink-soft">
        <PaperClipOutlined />
        {value.name}
      </span>
    )}
  </div>
);
