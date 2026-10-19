export type AppEnv = 'development' | 'staging' | 'production';

const readEnv = (key: keyof ImportMetaEnv, fallback = ''): string => {
  const value = import.meta.env[key] as string | undefined;
  return value ?? fallback;
};

// HTTPS فعلاً غیرفعال؛ هنگام دیپلوی واقعی دوباره فعال شود
// const ensureHttps = (url: string) => url.replace(/^http:\/\//i, 'https://');

export const env = {
  appEnv: readEnv('VITE_APP_ENV', 'development') as AppEnv,
  appTitle: readEnv('VITE_APP_TITLE', 'سامانه سانا'),
  apiBaseUrl: readEnv('VITE_API_BASE_URL'), // ensureHttps(readEnv('VITE_API_BASE_URL'))
  /** آدرس Facility API از Gateway (مدیریت شرکت‌ها و ...) */
  facilityApiBaseUrl: readEnv('VITE_FACILITY_API_BASE_URL', '/gateway/facility-mangment'),
  apiTimeout: Number(readEnv('VITE_API_TIMEOUT', '30000')),
  enableMock: readEnv('VITE_ENABLE_MOCK') === 'true',
  isDev: import.meta.env.DEV,
} as const;
