import { findMenuItemByPath } from './menu';
import { ROUTES } from './routes';

describe('findMenuItemByPath', () => {
  it('does not confuse routes that share a prefix', () => {
    expect(findMenuItemByPath(ROUTES.CREDIT)?.label).toBe('تخصیص وام');
    expect(findMenuItemByPath(ROUTES.CREDIT_APPROVE)?.label).toBe('تأیید اعتبارات');
  });

  it('matches home only on the root path', () => {
    expect(findMenuItemByPath(ROUTES.HOME)?.label).toBe('خانه');
    expect(findMenuItemByPath(ROUTES.USERS)?.label).toBe('مدیریت کاربران');
  });

  it('matches nested paths and ignores unknown ones', () => {
    expect(findMenuItemByPath(`${ROUTES.COMPANIES}/c-1`)?.label).toBe('مدیریت شرکت‌ها');
    expect(findMenuItemByPath('/unknown')).toBeUndefined();
  });
});
