import { Form, FormItem } from '@/component/form';
import { NumberInput } from '@/component/input';
import { toPersianDigits } from '@/utils/date';

import { SectionHeader } from './SectionHeader';

interface NumberListFieldsProps {
  name: 'murabahaRates' | 'terms';
  title: string;
  /** لیبل هر فیلد؛ شماره ردیف به انتهای آن اضافه می‌شود */
  itemLabel: string;
}

/** فهرست ثابتی از فیلدهای عددی (نرخ‌های مرابحه / مدت‌های بازپرداخت) */
export const NumberListFields = ({ name, title, itemLabel }: NumberListFieldsProps) => (
  <>
    <SectionHeader title={title} />
    <Form.List name={name}>
      {(fields) => (
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-3 xl:grid-cols-5">
          {fields.map((field, index) => (
            <FormItem
              key={field.key}
              name={field.name}
              label={`${itemLabel} ${toPersianDigits(index + 1)}`}
              required
            >
              <NumberInput min={0} />
            </FormItem>
          ))}
        </div>
      )}
    </Form.List>
  </>
);
