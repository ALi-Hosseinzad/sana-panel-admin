import { type FormProps as AntFormProps } from 'antd';
import { type ReactNode } from 'react';

export type FormColumns = 1 | 2 | 3 | 4;

export const GRID_CLASS: Record<FormColumns, string> = {
  1: 'grid grid-cols-1 gap-x-4',
  2: 'grid grid-cols-1 gap-x-4 md:grid-cols-2',
  3: 'grid grid-cols-1 gap-x-4 md:grid-cols-2 xl:grid-cols-3',
  4: 'grid grid-cols-1 gap-x-4 md:grid-cols-2 xl:grid-cols-4',
};

export interface BaseFormProps<T> extends Omit<AntFormProps<T>, 'layout' | 'children'> {
  children?: ReactNode;
  /** تعداد ستون فیلدها (ریسپانسیو) */
  columns?: FormColumns;
}

export interface VerticalFormProps<T> extends BaseFormProps<T> {
  layout?: 'vertical';
}

export interface SearchFormProps<T> extends Omit<BaseFormProps<T>, 'onFinish' | 'onReset'> {
  layout: 'inline';
  /** اگر داده شود فقط همین اجرا می‌شود؛ در غیر این صورت مقادیر به کوئری آدرس اضافه می‌شوند */
  onSearch?: (values: Partial<T>) => void;
  /** اگر داده شود فقط همین اجرا می‌شود؛ در غیر این صورت کوئری‌های همین فرم پاک می‌شوند */
  onReset?: () => void;
  /** تبدیل کوئری‌های آدرس به مقادیر اولیه فرم (پیش‌فرض: رشته؛ مقدار دارای «,» آرایه می‌شود) */
  parseQuery?: (params: Record<string, string>) => Partial<T>;
  searchText?: string;
  resetText?: string;
  loading?: boolean;
}
