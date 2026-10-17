import { QUERY_KEYS } from '@/constant/queryKeys';
import {
  avgDocTypesApi,
  cancelReasonsApi,
  noGrantReasonsApi,
  rejectReasonsApi,
} from '@/services/lookup';

import { getMurabahaRates, getTerms, updateMurabahaRates, updateTerms } from '../api';
import {
  GeneralSettingsCard,
  LookupListCard,
  NumberListCard,
  UsableMatrixCard,
} from '../components';

/** هر کارت سرویس گرفتن و ذخیره مخصوص خودش را دارد */
export const BaseInfoPage = () => (
  <>
    <GeneralSettingsCard />
    <NumberListCard
      title="نرخ‌های مرابحه قابل انتخاب (درصد)"
      itemLabel="نرخ مرابحه"
      queryKey={QUERY_KEYS.BASE_INFO.MURABAHA_RATES}
      fetcher={getMurabahaRates}
      updater={updateMurabahaRates}
    />
    <NumberListCard
      title="مدت‌های بازپرداخت قابل انتخاب (ماه)"
      itemLabel="مدت"
      queryKey={QUERY_KEYS.BASE_INFO.TERMS}
      fetcher={getTerms}
      updater={updateTerms}
    />
    <UsableMatrixCard />
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
