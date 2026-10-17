import { useLocation, useNavigate } from 'react-router';
import { Outlet } from 'react-router';

import { env } from '@/config/env';
import { findMenuItemByPath } from '@/constant/menu';
import { ROUTES } from '@/constant/routes';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';

import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

const DEFAULT_TITLE = 'داشبورد';

/** لی‌اوت اصلی (صفحات بعد از لاگین): سایدبار + هدر + محتوا + فوتر */
export const MainLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const clearProfile = useProfileStore((state) => state.clearProfile);

  const pageTitle = findMenuItemByPath(pathname)?.label ?? DEFAULT_TITLE;

  const handleLogout = () => {
    logout();
    clearProfile();
    void navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="grid min-h-screen grid-cols-[276px_minmax(0,1fr)] max-[960px]:grid-cols-1">
      <Sidebar title={env.appTitle} subtitle="طرح نگین میثاق" onLogout={handleLogout} />
      <div className="flex min-h-screen min-w-0 flex-col">
        <Header title={pageTitle} />
        <main className="flex-1 px-7 pt-6 pb-2 max-[960px]:p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
