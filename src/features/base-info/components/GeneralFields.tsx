import { Form, FormItem } from '@/component/form';
import { NumberInput } from '@/component/input';
import { Switch } from '@/component/switch';

const GRID = 'grid grid-cols-1 gap-x-4 md:grid-cols-2 xl:grid-cols-3';

/** فیلدهای اصلی طرح */
export const GeneralFields = () => {
  const sepahEnabled = Form.useWatch<boolean>('sepahEnabled');

  return (
    <div className={GRID}>
      <FormItem name="qarzRate" label="نرخ تسهیلات قرض‌الحسنه (درصد - ثابت)" required>
        <NumberInput min={0} max={100} />
      </FormItem>
      <FormItem name="contractYears" label="مدت قرارداد (سال)" required>
        <NumberInput min={1} />
      </FormItem>
      <FormItem name="graceMonths" label="مهلت استفاده از مانده اعتبار پس از انقضا (ماه)" required>
        <NumberInput min={0} />
      </FormItem>
      <FormItem name="maxPlans" label="حداکثر تعداد طرح قابل انتخاب برای هر شرکت" required>
        <NumberInput min={1} />
      </FormItem>
      <FormItem
        name="staffDelayMonths"
        label="مهلت مجاز شدن معرفی پرسنل پس از انعقاد قرارداد (ماه)"
        required
      >
        <NumberInput min={0} />
      </FormItem>
      <FormItem name="sepahEnabled" label="حقوق‌بگیر بانک سپه">
        <Switch checkedChildren="بله" unCheckedChildren="خیر" />
      </FormItem>
      {sepahEnabled && (
        <FormItem name="sepahMultiplier" label="نرخ تأثیر حقوق‌بگیر بودن بانک سپه (ضریب)" required>
          <NumberInput min={0} />
        </FormItem>
      )}
    </div>
  );
};
