import { useQuery } from '@tanstack/react-query';
import { useEffect, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

import { FullPageLoading } from '@/component/loading';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { ROUTES } from '@/constant/routes';
import { getProfile } from '@/features/auth/api';
import { selectIsAuthenticated, useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';

/** فقط کاربر لاگین‌شده؛ پروفایل در صورت نبود از سرور گرفته می‌شود */
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);
  const location = useLocation();

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.PROFILE,
    queryFn: getProfile,
    enabled: isAuthenticated && !profile,
  });

  useEffect(() => {
    if (data) setProfile(data);
  }, [data, setProfile]);

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  if (!profile && isPending) return <FullPageLoading />;
  return children;
};
