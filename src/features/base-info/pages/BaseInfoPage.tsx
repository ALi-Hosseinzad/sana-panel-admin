import { useState } from 'react';

import { QUERY_KEYS } from '@/constant/queryKeys';
import {
  avgDocTypesApi,
  cancelReasonsApi,
  noGrantReasonsApi,
  rejectReasonsApi,
} from '@/services/lookup';

import { LookupListCard, SchemeForm, SchemeTable } from '../components';

export const BaseInfoPage = () => {
  /** فرم ایجاد (schemeId خالی) یا ویرایش طرح؛ خالی = نمایش جدول طرح‌ها */
  const [editor, setEditor] = useState<{ schemeId: string | null } | null>(null);

  if (editor) {
    return (
      <SchemeForm
        key={editor.schemeId ?? 'new'}
        schemeId={editor.schemeId}
        onClose={() => setEditor(null)}
      />
    );
  }

  return (
    <>
      <SchemeTable
        onCreate={() => setEditor({ schemeId: null })}
        onEdit={(id) => setEditor({ schemeId: id })}
      />
      <LookupListCard
        title="دلایل لغو قرارداد"
        subtitle="این دلایل هنگام لغو قرارداد شرکت در یک فهرست کشویی نمایش داده می‌شوند."
        itemLabel="دلیل"
        queryKey={QUERY_KEYS.LOOKUPS.CANCEL_REASONS}
        api={cancelReasonsApi}
      />
      <LookupListCard
        title="دلایل رد درخواست وام"
        subtitle="این دلایل هنگام رد درخواست در مرحله «تأیید اعتبارات» در یک فهرست کشویی اجباری نمایش داده می‌شوند."
        itemLabel="دلیل"
        queryKey={QUERY_KEYS.LOOKUPS.REJECT_REASONS}
        api={rejectReasonsApi}
      />
      <LookupListCard
        title="دلایل عدم اعطای تسهیلات غیرحضوری"
        subtitle="این دلایل هنگام انتخاب مرحله «عدم اعطای تسهیلات غیرحضوری» (در تب تأیید اعتبارات) نمایش داده می‌شوند."
        itemLabel="دلیل"
        queryKey={QUERY_KEYS.LOOKUPS.NO_GRANT_REASONS}
        api={noGrantReasonsApi}
      />
      <LookupListCard
        title="انواع مستند میانگین موجودی"
        subtitle="هنگام ثبت میانگین موجودی، انتخاب یکی از این انواع مستند و بارگذاری فایل آن اجباری است."
        itemLabel="نوع مستند"
        queryKey={QUERY_KEYS.LOOKUPS.AVG_DOC_TYPES}
        api={avgDocTypesApi}
      />
    </>
  );
};
