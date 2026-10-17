import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * همه محیط‌ها (dev / stage / prod) همیشه روی https اجرا می‌شوند.
 * اگر گواهی معتبر محلی در `.cert` باشد (با `npm run cert` و ابزار mkcert ساخته می‌شود) از آن استفاده می‌شود؛
 * در غیر این صورت یک گواهی self-signed ساخته می‌شود.
 * نکته: Service Worker (و در نتیجه MSW) فقط با گواهی مورد اعتماد کار می‌کند.
 */
const CERT_KEY = '.cert/key.pem';
const CERT_FILE = '.cert/cert.pem';
const hasLocalCert = existsSync(CERT_KEY) && existsSync(CERT_FILE);

const https = hasLocalCert
  ? { key: readFileSync(CERT_KEY), cert: readFileSync(CERT_FILE) }
  : undefined;

export default defineConfig({
  plugins: [react(), tailwindcss(), ...(hasLocalCert ? [] : [basicSsl()])],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
    https,
  },
  preview: {
    port: 4173,
    https,
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
});
