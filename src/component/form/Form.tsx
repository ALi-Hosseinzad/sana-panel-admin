import { Form as AntForm } from 'antd';

import { SearchForm } from './SearchForm';
import { type SearchFormProps, type VerticalFormProps } from './types';
import { VerticalForm } from './VerticalForm';

export type FormProps<T> = VerticalFormProps<T> | SearchFormProps<T>;

/**
 * `layout="vertical"` (پیش‌فرض): همه فیلدها و دکمه‌ها را دولوپر اضافه می‌کند.
 * `layout="inline"`: فرم جستجو با دکمه‌های جستجو / حذف جستجو.
 */
export const Form = <T,>(props: FormProps<T>) =>
  props.layout === 'inline' ? <SearchForm<T> {...props} /> : <VerticalForm<T> {...props} />;

Form.useForm = AntForm.useForm;
Form.useWatch = AntForm.useWatch;
Form.useFormInstance = AntForm.useFormInstance;
Form.List = AntForm.List;
