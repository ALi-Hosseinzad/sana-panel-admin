import '@fontsource-variable/vazirmatn';
import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App';
import { env } from './config/env';
import { useThemeStore } from './store/useThemeStore';
import { applyPaletteToDocument } from './theme/palette';

// متغیرهای رنگ قبل از اولین رندر ست می‌شوند تا پرش رنگ نداشته باشیم
applyPaletteToDocument(useThemeStore.getState().mode);

const enableMocking = async () => {
  if (!env.enableMock) return;
  try {
    const { worker } = await import('./test/msw/browser');
    await worker.start({ onUnhandledFrame: 'bypass' });
  } catch (error) {
    console.error('[MSW] راه‌اندازی ماک انجام نشد؛ درخواست‌ها به سرور واقعی ارسال می‌شوند.', error);
  }
};

void enableMocking().then(() => {
  const container = document.getElementById('root');
  if (!container) throw new Error('Root element not found');
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
