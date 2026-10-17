import { ENDPOINTS } from '@/constant/endpoints';
import { type UploadedFile } from '@/types/common';

import { http } from '../http';

export const uploadFile = (file: File) =>
  http.upload<UploadedFile>(ENDPOINTS.FILES.UPLOAD, { file });

/** اگر فایل جدید انتخاب شده باشد آپلود می‌کند؛ در غیر این صورت همان فایل قبلی را برمی‌گرداند */
export const resolveFile = async (value?: File | UploadedFile | null) => {
  if (!value) return null;
  return value instanceof File ? uploadFile(value) : value;
};
