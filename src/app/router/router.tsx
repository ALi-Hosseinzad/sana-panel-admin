import { createBrowserRouter } from 'react-router';

import { AuthLayout, MainLayout } from '@/component/layout';
import { ROUTES } from '@/constant/routes';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { BaseInfoPage } from '@/features/base-info/pages/BaseInfoPage';
import { CompaniesPage } from '@/features/companies/pages/CompaniesPage';
import { CreditPage } from '@/features/credit/pages/CreditPage';
import { HomePage } from '@/features/home/pages/HomePage';
import { ManagerApprovalPage } from '@/features/manager-approval/pages/ManagerApprovalPage';
import { StaffPage } from '@/features/staff/pages/StaffPage';

import { GuestRoute } from './GuestRoute';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [{ path: ROUTES.LOGIN, element: <LoginPage /> }],
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.BASE_INFO, element: <BaseInfoPage /> },
      { path: ROUTES.COMPANIES, element: <CompaniesPage /> },
      { path: ROUTES.STAFF, element: <StaffPage /> },
      { path: ROUTES.CREDIT, element: <CreditPage /> },
      { path: ROUTES.MANAGER_APPROVE, element: <ManagerApprovalPage /> },
      // صفحات هر بخش بعداً در features ساخته و اینجا اضافه می‌شوند
      { path: '*', element: <HomePage /> },
    ],
  },
]);
