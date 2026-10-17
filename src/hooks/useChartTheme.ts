import { useThemeStore } from '@/store/useThemeStore';
import { CHART_CATEGORICAL, CHART_PAIR, CHART_STATUS } from '@/theme/chartPalette';
import { palettes } from '@/theme/palette';
import { FONT_FAMILY } from '@/theme/typography';

/** تم و رنگ‌های @ant-design/charts هماهنگ با تم فعلی */
export const useChartTheme = () => {
  const mode = useThemeStore((state) => state.mode);
  const palette = palettes[mode];
  return {
    theme: mode === 'dark' ? 'classicDark' : 'classic',
    categorical: CHART_CATEGORICAL[mode],
    pair: CHART_PAIR[mode],
    status: CHART_STATUS[mode],
    surface: palette.panel,
    textColor: palette.inkSoft,
    fontFamily: FONT_FAMILY,
  };
};
