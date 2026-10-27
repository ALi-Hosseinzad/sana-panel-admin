import { expect, test } from '@playwright/test';

/** بدنه درخواست‌های پیش‌نمایش (ماک داخل صفحه با Request ساخته می‌شود و به شبکه نمی‌رسد) */
const recordPreviews = `(() => {
  window.__previews = [];
  const NativeRequest = window.Request;
  window.Request = class extends NativeRequest {
    constructor(input, init) {
      super(input, init);
      if (String(input).includes('/LoanRequests/Preview') && typeof init?.body === 'string') {
        window.__previews.push(JSON.parse(init.body));
      }
    }
  };
})()`;

test('loan preview is called only after a plan is selected (never with planId 0)', async ({
  page,
}) => {
  await page.addInitScript(recordPreviews);
  await page.goto('/login');
  await page.getByLabel('نام کاربری').fill('admin');
  await page.getByLabel('رمز عبور').fill('admin');
  await page.getByRole('button', { name: /ورود/ }).click();
  await expect(page.getByRole('navigation')).toBeVisible();

  // ۱۴۰۵/۰۸/۱۲: روز مجاز انتقال اعتبار شرکت ۱ در ماک
  await page.goto('/credit?companyId=1&date=2026-11-03');
  const planIds = () =>
    page.evaluate<number[]>('window.__previews.map((body) => body.planId ?? 0)');
  await expect.poll(async () => (await planIds()).length, { timeout: 20_000 }).toBeGreaterThan(0);
  expect(await planIds()).not.toContain(0);
});
