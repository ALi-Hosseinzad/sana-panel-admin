// import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
// import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/*
 * ---------------- HTTPS (فعلاً غیرفعال؛ هنگام دیپلوی واقعی بررسی شود) ----------------
 * اگر گواهی معتبر محلی در `.cert` باشد (با mkcert ساخته می‌شود) از آن استفاده می‌شود؛
 * در غیر این صورت plugin-basic-ssl یک گواهی self-signed می‌سازد.
 * نکته: Service Worker (و در نتیجه MSW) فقط با گواهی مورد اعتماد کار می‌کند.
 * ساخت گواهی: mkdir -p .cert && mkcert -install && mkcert -key-file .cert/key.pem -cert-file .cert/cert.pem localhost 127.0.0.1 ::1
 *
 * const CERT_KEY = '.cert/key.pem';
 * const CERT_FILE = '.cert/cert.pem';
 * const hasLocalCert = existsSync(CERT_KEY) && existsSync(CERT_FILE);
 * const https = hasLocalCert
 *   ? { key: readFileSync(CERT_KEY), cert: readFileSync(CERT_FILE) }
 *   : undefined;
 */

export default defineConfig({
  // برای GitHub Pages مسیر پایه (مثلاً /sana-panel-admin/) از متغیر BASE_PATH خوانده می‌شود
  base: process.env.BASE_PATH ?? '/',
  plugins: [
    react(),
    tailwindcss(),
    // ...(hasLocalCert ? [] : [basicSsl()]),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
    // https,
  },
  preview: {
    port: 4173,
    // https,
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
});
