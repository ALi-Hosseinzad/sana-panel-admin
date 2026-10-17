import { TextListFields } from './TextListFields';

/** دلایل لغو، رد، عدم اعطا و انواع مستند میانگین */
export const TextListsSection = () => (
  <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
    <div>
      <TextListFields
        name="cancelReasons"
        title="دلایل لغو قرارداد"
        placeholder="مثلاً عدم تمدید به درخواست شرکت"
        addText="افزودن دلیل"
      />
    </div>
    <div>
      <TextListFields
        name="rejectReasons"
        title="دلایل رد درخواست وام"
        placeholder="مثلاً پایین بودن رتبه اعتباری"
        addText="افزودن دلیل"
      />
    </div>
    <div>
      <TextListFields
        name="noGrantReasons"
        title="دلایل عدم اعطای تسهیلات غیرحضوری"
        subtitle="این دلایل هنگام انتخاب مرحله «عدم اعطای تسهیلات غیرحضوری» (در تأیید اعتبارات) نمایش داده می‌شوند."
        placeholder="مثلاً رتبه اعتباری غیرمجاز"
        addText="افزودن دلیل"
      />
    </div>
    <div>
      <TextListFields
        name="avgDocTypes"
        title="انواع مستند میانگین موجودی"
        subtitle="هنگام ثبت میانگین موجودی، انتخاب یکی از این انواع مستند و بارگذاری فایل آن اجباری است."
        placeholder="مثلاً نامه"
        addText="افزودن نوع مستند"
      />
    </div>
  </div>
);
