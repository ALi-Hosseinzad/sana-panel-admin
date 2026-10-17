import { useThemeStore } from '@/store/useThemeStore';

/** نام تم @ant-design/charts هماهنگ با تم فعلی */
export const useChartTheme = () => {
  const mode = useThemeStore((state) => state.mode);
  return mode === 'dark' ? 'classicDark' : 'classic';
};
