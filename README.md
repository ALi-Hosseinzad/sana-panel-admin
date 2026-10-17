# پنل سانا (sana-panel-admin)

پنل مدیریتی **سامانه اعتباری نوید امید (سانا)** — راست‌چین، با تم روشن/تیره.

## اجرا

```bash
npm install
npm run dev          # محیط development  (http://localhost:5173)
npm run dev:stage    # محیط staging
npm run build        # بیلد production
npm run build:stage  # بیلد staging
```

> **HTTPS فعلاً غیرفعال است** و پروژه روی `http://localhost:5173` اجرا می‌شود.
> تنظیمات https و گواهی در `vite.config.ts`، `playwright.config.ts` و `src/config/env.ts` کامنت شده‌اند
> و هنگام دیپلوی واقعی دوباره بررسی و فعال می‌شوند.

در محیط development دیتای ماک (MSW) فعال است. کاربر نمونه: `admin / admin` یا `branch / branch`.

| فرمان                       | کار                                                    |
| --------------------------- | ------------------------------------------------------ |
| `npm run lint` / `lint:fix` | ESLint (TypeScript، React، Hooks، Sonar، قوانین SOLID) |
| `npm run format`            | Prettier                                               |
| `npm run typecheck`         | بررسی تایپ‌ها                                          |
| `npm test` / `test:run`     | Vitest                                                 |
| `npm run test:e2e`          | Playwright                                             |

قبل از هر کامیت، Husky و lint-staged روی فایل‌های stage‌شده lint و format اجرا می‌کنند.
همه فایل‌ها با پایان خط **LF** هستند (`.gitattributes` و `.editorconfig`).

## محیط‌ها

فایل‌های `.env.development`، `.env.staging` و `.env.production`:

| متغیر               | توضیح                 |
| ------------------- | --------------------- |
| `VITE_API_BASE_URL` | آدرس API              |
| `VITE_API_TIMEOUT`  | تایم‌اوت درخواست (ms) |
| `VITE_ENABLE_MOCK`  | فعال بودن ماک MSW     |
| `VITE_APP_TITLE`    | عنوان سامانه          |

## ساختار پوشه‌ها

```
src/
├─ app/            راه‌اندازی اپ: providers (تم، Query، ErrorBoundary، Toaster) و router
├─ assets/         عکس‌ها و آیکون‌های خاص
├─ component/      همه کامپوننت‌های پایه + layout
├─ constant/       ثابت‌ها: routes، menu، roles، endpoints، queryKeys و mock/ (همه دیتای ماک)
├─ store/          استورهای Zustand (auth، profile، theme)
├─ features/       بخش‌های پروژه (هر بخش: pages، api، types)
├─ services/http/  axios، interceptor، هندلر خطا، توابع پایه درخواست
├─ hooks/          useQueryParams، usePrint، useChartTheme
├─ utils/          تاریخ جلالی، مبلغ، اکسل
├─ theme/          پالت رنگ (لایت/دارک)، توکن‌های antd، تایپوگرافی
├─ styles/         CSS اصلی (لایه‌بندی Tailwind و antd)
├─ config/         خواندن env
├─ types/          تایپ‌های عمومی
└─ test/           setup تست و handlerهای MSW
```

## نکات کلیدی

### HTTP و مدیریت خطا

```ts
import { http } from '@/services/http';

http.get<User[]>('/users');
http.post<User, CreateUser>('/users', body);
http.upload('/files', { file });
http.download('/reports/1', 'report.xlsx');

// هندلر اختصاصی برای کد وضعیت: اگر باشد فقط همین اجرا می‌شود، وگرنه رفتار پیش‌فرض همان کد
http.get('/users/1', {
  onError: {
    404: () => navigate('/users'),
    network: () => toast.error('اینترنت قطع است'),
  },
});
http.get('/ping', { silent: true }); // بدون هیچ توست/ریدایرکت پیش‌فرض
```

رفتارهای پیش‌فرض در `services/http/errorHandler.ts` هستند (مثلاً ۴۰۱ = خروج از حساب).

### احراز هویت

فقط `useAuthStore` با کوکی کار می‌کند: موقع لاگین `login(token)` و موقع خروج `logout()`.
interceptor و بقیه بخش‌ها توکن را فقط از همین استور می‌خوانند.
اطلاعات کاربر و نقش‌ها در `useProfileStore` هستند (`hasRole`). آیتم‌های سایدبار هم بر اساس نقش فیلتر می‌شوند.

### فرم

```tsx
// فرم عمودی: همه فیلدها و دکمه‌ها با دولوپر
<Form layout="vertical" columns={3} onFinish={save}>
  <FormItem name="name" label="نام" required><TextInput /></FormItem>
  <FormItem name="active"><Switch label="فعال" /></FormItem>
</Form>

// فرم جستجو: دکمه‌های جستجو و حذف جستجو خودکار اضافه می‌شوند.
// بدون onSearch مقادیر به کوئری آدرس اضافه می‌شوند و «حذف جستجو» فقط همان کوئری‌ها را پاک می‌کند.
<Form layout="inline" onSearch={(values) => setFilters(values)}>
  <FormItem name="q" label="جستجو"><TextInput /></FormItem>
  <FormItem name="from" label="از تاریخ"><DateInput /></FormItem>
</Form>
```

### تاریخ

- ورودی: `DateInput` (react-multi-date-picker) با حالت‌های تکی/بازه/چندتایی، روز/ماه/سال و ساعت.
  مقدار همیشه رشته میلادی است (`YYYY-MM-DD`).
- نمایش: `formatJalali(date, 'YYYY/MM/DD')` یا `dayjs(date).formatJalali('dddd D MMMM YYYY')`.

### جدول

پجینیشن به‌صورت پیش‌فرض غیرفعال است:

- `pagination` → صفحه‌بندی داخلی.
- `pagination={{ current, pageSize, total, onChange }}` → صفحه‌بندی سمت سرور.

صفحات وسط جدول قرار می‌گیرند و تعداد کل رکورد در انتهای سمت چپ.

### سایر

| مورد  | ابزار                                             |
| ----- | ------------------------------------------------- |
| اکسل  | `exportToExcel` و `readExcel` در `utils/excel.ts` |
| پرینت | `usePrint()`                                      |
| چارت  | `@ant-design/charts` با `theme={useChartTheme()}` |
