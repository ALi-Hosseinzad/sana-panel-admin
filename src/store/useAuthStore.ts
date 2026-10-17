import Cookies from 'js-cookie';
import { create } from 'zustand';

const TOKEN_COOKIE = 'sana_token';

interface AuthState {
  token: string | null;
  /** فقط موقع لاگین صدا زده می‌شود؛ کوکی را یک بار ست می‌کند */
  login: (token: string, options?: { expiresInDays?: number }) => void;
  /** موقع لاگ‌اوت یا ۴۰۱؛ کوکی را حذف می‌کند */
  logout: () => void;
}

/**
 * تنها جای پروژه که با کوکی کار می‌کند.
 * بقیه بخش‌ها (از جمله interceptor) فقط از این استور می‌خوانند.
 */
export const useAuthStore = create<AuthState>()((set) => ({
  token: Cookies.get(TOKEN_COOKIE) ?? null,
  login: (token, options) => {
    Cookies.set(TOKEN_COOKIE, token, {
      // HTTPS فعلاً غیرفعال است؛ هنگام دیپلوی واقعی روی https دوباره `secure: true` شود
      // secure: true,
      secure: window.location.protocol === 'https:',
      sameSite: 'strict',
      expires: options?.expiresInDays,
    });
    set({ token });
  },
  logout: () => {
    Cookies.remove(TOKEN_COOKIE);
    set({ token: null });
  },
}));

export const selectIsAuthenticated = (state: AuthState) => Boolean(state.token);
