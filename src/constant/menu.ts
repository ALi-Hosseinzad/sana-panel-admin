import {
  AuditOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ControlOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  SafetyOutlined,
  ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { type ComponentType } from 'react';

import { ROLES, type Role } from './roles';
import { ROUTES } from './routes';

export interface MenuItem {
  key: string;
  label: string;
  path: string;
  icon: ComponentType;
  /** نقش‌های مجاز؛ خالی = همه کاربران */
  roles?: Role[];
}

export interface MenuGroup {
  key: string;
  title: string;
  items: MenuItem[];
}

export const MENU: MenuGroup[] = [
  {
    key: 'settings',
    title: 'تنظیمات',
    items: [
      {
        key: 'base-info',
        label: 'اطلاعات پایه طرح',
        path: ROUTES.BASE_INFO,
        icon: ControlOutlined,
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    key: 'management',
    title: 'مدیریت',
    items: [
      {
        key: 'companies',
        label: 'مدیریت شرکت‌ها',
        path: ROUTES.COMPANIES,
        icon: ShopOutlined,
        roles: [ROLES.ADMIN, ROLES.BRANCH],
      },
      {
        key: 'staff',
        label: 'پرسنل شرکت',
        path: ROUTES.STAFF,
        icon: TeamOutlined,
        roles: [ROLES.ADMIN, ROLES.BRANCH],
      },
    ],
  },
  {
    key: 'credit-operations',
    title: 'عملیات اعتباری',
    items: [
      {
        key: 'credit',
        label: 'تخصیص وام',
        path: ROUTES.CREDIT,
        icon: CreditCardOutlined,
        roles: [ROLES.ADMIN, ROLES.BRANCH],
      },
      {
        key: 'manager-approve',
        label: 'تأیید مدیر شرکت',
        path: ROUTES.MANAGER_APPROVE,
        icon: AuditOutlined,
        roles: [ROLES.ADMIN, ROLES.COMPANY_MANAGER],
      },
      {
        key: 'credit-approve',
        label: 'تأیید اعتبارات',
        path: ROUTES.CREDIT_APPROVE,
        icon: CheckCircleOutlined,
        roles: [ROLES.ADMIN, ROLES.CREDIT_APPROVER],
      },
    ],
  },
  {
    key: 'reports',
    title: 'گزارش و کنترل',
    items: [
      {
        key: 'dashboard',
        label: 'داشبورد مدیریتی',
        path: ROUTES.DASHBOARD,
        icon: BarChartOutlined,
        roles: [ROLES.ADMIN, ROLES.REPORT_VIEWER],
      },
      {
        key: 'users',
        label: 'مدیریت کاربران',
        path: ROUTES.USERS,
        icon: SafetyOutlined,
        roles: [ROLES.ADMIN],
      },
      {
        key: 'change-log',
        label: 'گزارش تغییرات',
        path: ROUTES.CHANGE_LOG,
        icon: HistoryOutlined,
        roles: [ROLES.ADMIN],
      },
    ],
  },
];

/** آیتم منوی صفحه فعلی (دقیق یا زیرمسیر آن؛ /credit-approve با /credit اشتباه گرفته نمی‌شود) */
export const findMenuItemByPath = (pathname: string) =>
  MENU.flatMap((group) => group.items).find(
    (item) => pathname === item.path || pathname.startsWith(`${item.path}/`),
  );
