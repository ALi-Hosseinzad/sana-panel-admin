import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

// vite.config تابعی از mode است؛ اول با همان env اجرا و بعد با تنظیمات تست ادغام می‌شود
export default defineConfig((configEnv) =>
  mergeConfig(viteConfig(configEnv), {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      css: false,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.test.{ts,tsx}', 'src/test/**', 'src/constant/mock/**'],
      },
    },
  }),
);
