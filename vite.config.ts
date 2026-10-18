// import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
// import { readFileSync } from 'node:fs';

// const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  return {
    plugins: [react(), tailwindcss(), ...(env.HTTPS === 'true' ? [basicSsl()] : [])],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      open: true,
      cors: true,
      fs: { strict: false },
      port: Number(env.PORT) || 3005,
    },
    preview: {
      port: 4173,
      // https,
    },
    build: {
      sourcemap: !isProduction,
      chunkSizeWarningLimit: 1500,
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
            format: { comments: false },
          }
        : undefined,
    },
  };
});
