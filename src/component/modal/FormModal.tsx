import { Form as AntForm, type FormInstance } from 'antd';
import { useEffect, useState, type ReactNode } from 'react';

import { Form } from '../form';
import { type FormColumns } from '../form/types';

import { Modal, type ModalProps } from './Modal';

export interface FormModalProps<T> extends Omit<ModalProps, 'onOk' | 'children'> {
  /** فقط فیلدهای فرم (FormItem ها) */
  children: ReactNode;
  /** با زدن دکمه تأیید و معتبر بودن فرم صدا زده می‌شود؛ اگر Promise برگرداند تا پایانش لودینگ نمایش داده می‌شود */
  onSubmit: (values: T) => void | Promise<unknown>;
  initialValues?: Partial<T>;
  columns?: FormColumns;
  form?: FormInstance<T>;
  /** بعد از ثبت موفق مودال بسته شود (پیش‌فرض true) */
  closeOnSuccess?: boolean;
}

/** مودال حاوی فرم؛ دکمه تأیید فرم را submit می‌کند */
export const FormModal = <T,>({
  children,
  onSubmit,
  initialValues,
  columns = 1,
  form: externalForm,
  closeOnSuccess = true,
  open,
  onCancel,
  okText = 'ثبت',
  confirmLoading,
  ...rest
}: FormModalProps<T>) => {
  const [form] = AntForm.useForm<T>(externalForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) form.setFieldsValue((initialValues ?? {}) as never);
  }, [open, initialValues, form]);

  const handleFinish = async (values: T) => {
    setSubmitting(true);
    try {
      await onSubmit(values);
      if (closeOnSuccess) {
        form.resetFields();
        onCancel?.(undefined as never);
      }
    } catch {
      // خطا قبلاً توسط هندلر HTTP یا onError همان درخواست نمایش داده شده؛ مودال باز می‌ماند
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      okText={okText}
      onOk={() => form.submit()}
      onCancel={onCancel}
      confirmLoading={confirmLoading ?? submitting}
      afterClose={() => form.resetFields()}
      // فرم همیشه ساخته می‌ماند تا مقداردهی (مثلاً در حالت ویرایش) قبل از باز شدن مودال هم اعمال شود
      forceRender
      destroyOnHidden={false}
      {...rest}
    >
      <Form<T>
        form={form}
        layout="vertical"
        columns={columns}
        onFinish={handleFinish}
        className="pt-2"
      >
        {children}
      </Form>
    </Modal>
  );
};
