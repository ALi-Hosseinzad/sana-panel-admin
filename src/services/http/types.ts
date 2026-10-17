import { type AxiosError } from 'axios';

import { type ApiErrorBody } from '@/types/common';

export type HttpError = AxiosError<ApiErrorBody>;

export type StatusErrorHandler = (error: HttpError) => void;

/**
 * هندلرهای اختصاصی خطا برای هر درخواست.
 * کلید: کد وضعیت (مثل 404)، `network` برای قطعی شبکه/تایم‌اوت، `default` برای بقیه کدها.
 */
export type ErrorHandlerMap = Partial<Record<number | 'network' | 'default', StatusErrorHandler>>;

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  interface AxiosRequestConfig<D = any> {
    /**
     * اگر برای کد وضعیتِ خطا هندلر داده شود، فقط همان اجرا می‌شود؛
     * در غیر این صورت رفتار پیش‌فرض همان کد وضعیت اجرا خواهد شد.
     */
    onError?: ErrorHandlerMap;
    /** هیچ رفتار پیش‌فرضی (توست/ریدایرکت) اجرا نشود */
    silent?: boolean;
  }
}
