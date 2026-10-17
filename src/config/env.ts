export type AppEnv = 'development' | 'staging' | 'production';

const readEnv = (key: keyof ImportMetaEnv, fallback = ''): string => {
  const value = import.meta.env[key] as string | undefined;
  return value ?? fallback;
};

const ensureHttps = (url: string) => url.replace(/^http:\/\//i, 'https://');

export const env = {
  appEnv: readEnv('VITE_APP_ENV', 'development') as AppEnv,
  appTitle: readEnv('VITE_APP_TITLE', 'سامانه سانا'),
  apiBaseUrl: ensureHttps(readEnv('VITE_API_BASE_URL')),
  apiTimeout: Number(readEnv('VITE_API_TIMEOUT', '30000')),
  enableMock: readEnv('VITE_ENABLE_MOCK') === 'true',
  isDev: import.meta.env.DEV,
} as const;
