import { type ReactNode } from 'react';
import { Navigate } from 'react-router';

import { ROUTES } from '@/constant/routes';
import { selectIsAuthenticated, useAuthStore } from '@/store/useAuthStore';

/** فقط کاربر لاگین‌نشده (صفحات قبل از لاگین) */
export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  if (isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;
  return children;
};
