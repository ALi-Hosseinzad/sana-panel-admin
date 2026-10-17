export type ThemeMode = 'light' | 'dark';

/**
 * پالت رنگ‌ها — مقادیر تم لایت از فایل طراحی (panel-negin-misagh) برداشته شده
 * و تم دارک از همان خانواده رنگ (navy + طلایی) ساخته شده است.
 * این فایل تنها منبع رنگ‌هاست؛ هم توکن‌های antd و هم متغیرهای Tailwind از همین ساخته می‌شوند.
 */
export interface Palette {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  amber: string;
  goldSoft: string;
  goldSoftBorder: string;
  goldSoftText: string;
  bg: string;
  panel: string;
  line: string;
  line2: string;
  ink: string;
  inkSoft: string;
  heading: string;
  headingSub: string;
  label: string;
  inputBg: string;
  inputBorder: string;
  inputBorderHover: string;
  disabledBg: string;
  disabledText: string;
  tableHead: string;
  rowHover: string;
  success: string;
  successBg: string;
  successBorder: string;
  successText: string;
  warning: string;
  warningBg: string;
  warningText: string;
  danger: string;
  dangerHover: string;
  dangerBg: string;
  dangerBorder: string;
  dangerText: string;
  sidebarFrom: string;
  sidebarVia: string;
  sidebarTo: string;
  sidebarText: string;
  sidebarMuted: string;
  sidebarGroup: string;
  topbarBg: string;
  overlay: string;
  scrollbar: string;
}

export const lightPalette: Palette = {
  primary: '#0E2B47',
  primaryHover: '#17406A',
  primaryActive: '#0A2239',
  accent: '#C99A2E',
  accentHover: '#B8891F',
  accentLight: '#E8C56A',
  amber: '#8A6214',
  goldSoft: '#FBF3DF',
  goldSoftBorder: '#F0DDA8',
  goldSoftText: '#5C4510',
  bg: '#F3F5F9',
  panel: '#FFFFFF',
  line: '#E3E8F0',
  line2: '#EEF1F6',
  ink: '#172033',
  inkSoft: '#667085',
  heading: '#0E2B47',
  headingSub: '#17406A',
  label: '#475467',
  inputBg: '#FFFFFF',
  inputBorder: '#D5DCE8',
  inputBorderHover: '#B9C3D4',
  disabledBg: '#F2F4F8',
  disabledText: '#98A2B3',
  tableHead: '#F7F9FC',
  rowHover: '#FAFBFD',
  success: '#12805C',
  successBg: '#E3F6EE',
  successBorder: '#BFE6D3',
  successText: '#0F6B4C',
  warning: '#B7791F',
  warningBg: '#FDF1D8',
  warningText: '#8A5A1C',
  danger: '#C0392B',
  dangerHover: '#A93226',
  dangerBg: '#FDE7E4',
  dangerBorder: '#F5CBC5',
  dangerText: '#B02A1D',
  sidebarFrom: '#0A2239',
  sidebarVia: '#0E2B47',
  sidebarTo: '#123A5E',
  sidebarText: '#D4DFEC',
  sidebarMuted: '#AFC1D6',
  sidebarGroup: '#8FA6C0',
  topbarBg: 'rgba(255,255,255,.92)',
  overlay: 'rgba(10,34,57,.55)',
  scrollbar: '#CBD3DF',
};

export const darkPalette: Palette = {
  primary: '#3B78B5',
  primaryHover: '#4F8BC6',
  primaryActive: '#2D6399',
  accent: '#D4A73E',
  accentHover: '#E0B550',
  accentLight: '#E8C56A',
  amber: '#E0B550',
  goldSoft: '#2A2416',
  goldSoftBorder: '#5A4A22',
  goldSoftText: '#F0DDA8',
  bg: '#08131F',
  panel: '#0F2033',
  line: '#1F3550',
  line2: '#182C43',
  ink: '#E6EDF6',
  inkSoft: '#93A4BA',
  heading: '#F2F6FB',
  headingSub: '#C9D7E8',
  label: '#B4C2D3',
  inputBg: '#0B1A2B',
  inputBorder: '#2A4262',
  inputBorderHover: '#3D5778',
  disabledBg: '#14263B',
  disabledText: '#5F7491',
  tableHead: '#13273D',
  rowHover: '#152B44',
  success: '#2FB384',
  successBg: '#0F2E25',
  successBorder: '#1C5A45',
  successText: '#7FDDB8',
  warning: '#E0A43A',
  warningBg: '#2E2412',
  warningText: '#F2CC85',
  danger: '#E5594A',
  dangerHover: '#EF6B5D',
  dangerBg: '#341716',
  dangerBorder: '#6B2A24',
  dangerText: '#F5A097',
  sidebarFrom: '#050D17',
  sidebarVia: '#081526',
  sidebarTo: '#0C2036',
  sidebarText: '#C2D0E0',
  sidebarMuted: '#8EA3BB',
  sidebarGroup: '#6F87A3',
  topbarBg: 'rgba(15,32,51,.9)',
  overlay: 'rgba(2,8,16,.7)',
  scrollbar: '#2A4262',
};

export const palettes: Record<ThemeMode, Palette> = {
  light: lightPalette,
  dark: darkPalette,
};

const toKebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** متغیرهای CSS (`--sana-*`) را روی :root می‌نشاند تا Tailwind و استایل‌ها از آن بخوانند */
export const applyPaletteToDocument = (mode: ThemeMode) => {
  const root = document.documentElement;
  const palette = palettes[mode];
  Object.entries(palette).forEach(([key, value]) => {
    root.style.setProperty(`--sana-${toKebab(key)}`, value);
  });
  root.classList.toggle('dark', mode === 'dark');
  root.style.colorScheme = mode;
};
