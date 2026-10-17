import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { Button } from '@/component/button';
import { Form, FormItem } from '@/component/form';
import { TextInput } from '@/component/input';

import { SectionHeader } from './SectionHeader';

interface TextListFieldProps {
  name: 'cancelReasons' | 'rejectReasons' | 'noGrantReasons' | 'avgDocTypes';
  title: string;
  subtitle: string;
  addText?: string;
}

/** فهرست متنی قابل افزودن/حذف (مثل دلایل لغو یا انواع مستند) */
export const TextListField = ({
  name,
  title,
  subtitle,
  addText = 'افزودن دلیل جدید',
}: TextListFieldProps) => (
  <>
    <SectionHeader title={title} subtitle={subtitle} />
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <div className="flex flex-col gap-2">
          {fields.map((field) => (
            <div key={field.key} className="flex items-center gap-2">
              <div className="flex-1">
                <FormItem name={field.name} noStyle>
                  <TextInput placeholder="عنوان را وارد کنید" />
                </FormItem>
              </div>
              <Button
                variant="secondary"
                icon={<DeleteOutlined />}
                onClick={() => remove(field.name)}
              >
                حذف
              </Button>
            </div>
          ))}
          <div>
            <Button variant="outline" size="small" icon={<PlusOutlined />} onClick={() => add('')}>
              {addText}
            </Button>
          </div>
        </div>
      )}
    </Form.List>
  </>
);
