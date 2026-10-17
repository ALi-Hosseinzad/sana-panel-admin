import { type ThemeMode } from './palette';

/**
 * رنگ‌های چارت — با اسکریپت validate_palette (اسکیل dataviz) برای هر دو حالت روی سطح پنل بررسی شده‌اند:
 * باند روشنایی، کروما، تفکیک برای انواع کوررنگی (همسایه‌ها) و حد بینایی عادی.
 * ترتیب ثابت است و چرخشی تکرار نمی‌شود؛ بیش از ۵ سری در «سایر» جمع می‌شود.
 */
export const CHART_CATEGORICAL: Record<ThemeMode, string[]> = {
  light: ['#3B78B5', '#E87BA4', '#C99A2E', '#6250D6', '#1BAF7A'],
  dark: ['#5B95D0', '#D55181', '#B8891F', '#9085E9', '#199E70'],
};

/** دو سری مقایسه‌ای (ایجادشده / تخصیص‌یافته) */
export const CHART_PAIR: Record<ThemeMode, [string, string]> = {
  light: ['#C99A2E', '#3B78B5'],
  dark: ['#B8891F', '#5B95D0'],
};

/** رنگ وضعیت‌ها (رزرو شده برای وضعیت؛ برای سری عادی استفاده نشود) */
export const CHART_STATUS: Record<
  ThemeMode,
  { approved: string; pending: string; rejected: string }
> = {
  light: { approved: '#12805C', pending: '#B7791F', rejected: '#C0392B' },
  dark: { approved: '#2FB384', pending: '#E0A43A', rejected: '#E5594A' },
};

export const CHART_MAX_CATEGORIES = CHART_CATEGORICAL.light.length;
