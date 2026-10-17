import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { Button } from '@/component/button';
import { PanelCard } from '@/component/card';
import { Form, FormItem } from '@/component/form';
import { NumberInput } from '@/component/input';
import { toPersianDigits } from '@/utils/date';

interface NumberListFieldsProps {
  name: 'murabahaRates' | 'terms';
  title: string;
  /** لیبل هر فیلد؛ شماره ردیف به انتهای آن اضافه می‌شود */
  itemLabel: string;
  /** بعد از حذف یک آیتم (برای هماهنگ کردن جدول درصدها) */
  onRemove: (index: number) => void;
}

/** لیست عددی قابل افزودن/حذف (نرخ‌های مرابحه / مدت‌های بازپرداخت) */
export const NumberListFields = ({ name, title, itemLabel, onRemove }: NumberListFieldsProps) => (
  <Form.List name={name}>
    {(fields, { add, remove }) => (
      <PanelCard
        title={title}
        extra={
          <Button variant="outline" size="small" icon={<PlusOutlined />} onClick={() => add()}>
            افزودن {itemLabel}
          </Button>
        }
      >
        {fields.length === 0 ? (
          <p className="my-2 text-xs text-ink-soft">هنوز {itemLabel}ی اضافه نشده است.</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-3 xl:grid-cols-5">
            {fields.map((field, index) => (
              <div key={field.key} className="flex items-start gap-1">
                <FormItem
                  name={field.name}
                  label={`${itemLabel} ${toPersianDigits(index + 1)}`}
                  required
                  className="flex-1"
                >
                  <NumberInput min={0} />
                </FormItem>
                <Button
                  variant="text"
                  icon={<DeleteOutlined />}
                  aria-label={`حذف ${itemLabel} ${toPersianDigits(index + 1)}`}
                  className="mt-[30px]"
                  onClick={() => {
                    remove(index);
                    onRemove(index);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </PanelCard>
    )}
  </Form.List>
);
