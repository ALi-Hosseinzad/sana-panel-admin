import { type ComponentType, lazy } from 'react';

/**
 * لود تنبل یک صفحه با export نام‌دار (مثل `export const CompaniesPage`).
 * کد هر صفحه در یک chunk جدا قرار می‌گیرد و فقط هنگام ورود به آن دانلود می‌شود.
 */
export const lazyPage = <K extends string>(
  importer: () => Promise<Record<K, ComponentType>>,
  name: K,
) => lazy(() => importer().then((module) => ({ default: module[name] })));
