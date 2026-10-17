import { Result } from 'antd';
import { type FallbackProps } from 'react-error-boundary';

import { Button } from '@/component/button';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="flex min-h-screen items-center justify-center p-6">
    <Result
      status="error"
      title="خطای غیرمنتظره‌ای رخ داد"
      subTitle={
        import.meta.env.DEV && error instanceof Error ? error.message : 'لطفاً دوباره تلاش کنید.'
      }
      extra={<Button onClick={resetErrorBoundary}>تلاش مجدد</Button>}
    />
  </div>
);
