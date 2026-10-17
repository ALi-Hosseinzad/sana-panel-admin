import { Form, FormItem } from '@/component/form';
import { DateInput, TextInput } from '@/component/input';

import { type StaffFilters } from '../types';

/** جستجوی پرسنل — مقادیر در کوئری آدرس نوشته می‌شوند */
export const StaffSearch = () => (
  <Form<StaffFilters> layout="inline">
    <FormItem name="q" label="جستجو (نام، کد ملی، موبایل، کد پرسنلی)">
      <TextInput placeholder="جستجو..." />
    </FormItem>
    <FormItem name="hireFrom" label="از تاریخ استخدام">
      <DateInput />
    </FormItem>
    <FormItem name="hireTo" label="تا تاریخ استخدام">
      <DateInput />
    </FormItem>
  </Form>
);
