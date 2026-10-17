import { Form } from 'antd';

import { FormItem } from '@/component/form';
import { NumberInput, TextInput } from '@/component/input';
import { Switch } from '@/component/switch';

import { type SchemePayload } from '../types';

import { SectionTitle } from './SectionTitle';

/** نام طرح و تنظیمات عمومی */
export const GeneralFields = () => {
  const sepahEnabled = Form.useWatch<boolean | undefined>('sepahEnabled');

  return (
    <>
      <SectionTitle title="تنظیمات عمومی" />
      <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2 xl:grid-cols-3">
        <FormItem<SchemePayload> name="name" label="نام طرح" required>
          <TextInput placeholder="مثلاً نگین میثاق" />
        </FormItem>
        <FormItem<SchemePayload>
          name="qarzRate"
          label="نرخ تسهیلات قرض‌الحسنه (درصد - ثابت)"
          required
        >
          <NumberInput min={0} step={0.1} />
        </FormItem>
        <FormItem<SchemePayload> name="sepahEnabled" label="حقوق‌بگیر بانک سپه">
          <Switch label={sepahEnabled ? 'بله' : 'خیر'} />
        </FormItem>
        {sepahEnabled && (
          <FormItem<SchemePayload>
            name="sepahMultiplier"
            label="نرخ تأثیر حقوق‌بگیر بودن بانک سپه (ضریب)"
            required
          >
            <NumberInput min={0} step={0.01} />
          </FormItem>
        )}
        <FormItem<SchemePayload> name="contractYears" label="مدت قرارداد (سال)" required>
          <NumberInput min={1} />
        </FormItem>
        <FormItem<SchemePayload>
          name="graceMonths"
          label="مهلت استفاده از مانده اعتبار پس از انقضا (ماه)"
          required
        >
          <NumberInput min={0} />
        </FormItem>
        <FormItem<SchemePayload>
          name="maxPlans"
          label="حداکثر تعداد طرح قابل انتخاب برای هر شرکت"
          required
        >
          <NumberInput min={1} />
        </FormItem>
        <FormItem<SchemePayload>
          name="staffDelayMonths"
          label="مهلت مجاز شدن معرفی پرسنل پس از انعقاد قرارداد (ماه)"
          required
        >
          <NumberInput min={0} />
        </FormItem>
      </div>
    </>
  );
};
