import { StyleProvider } from '@ant-design/cssinjs';
import { App as AntApp, ConfigProvider } from 'antd';
import faIR from 'antd/locale/fa_IR';
import { type ReactNode, useMemo } from 'react';

import { useThemeStore } from '@/store/useThemeStore';
import { buildAntdTheme } from '@/theme/antdTheme';

/** تم antd (دارک/لایت) + راست‌چین + قرار دادن استایل antd در لایه `antd` برای هماهنگی با Tailwind */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const mode = useThemeStore((state) => state.mode);
  const antdTheme = useMemo(() => buildAntdTheme(mode), [mode]);

  return (
    <StyleProvider layer>
      <ConfigProvider direction="rtl" locale={faIR} theme={antdTheme}>
        <AntApp>{children}</AntApp>
      </ConfigProvider>
    </StyleProvider>
  );
};
