import {
  MOCK_AUDIT_LOGS,
  MOCK_COMPANIES,
  MOCK_LOAN_REQUESTS,
  MOCK_MANAGED_USERS,
  MOCK_POST_APPROVAL_STAGES,
  MOCK_SCHEMES,
  MOCK_STAFF,
  MOCK_USERS,
  type MockReasonKind,
  type MockScheme,
} from '@/constant/mock';
import type { PlanOption } from '@/services/lookup/types';

/**
 * دیتابیس ماک در حافظه — شبیه‌ساز بک‌اند.
 * با رفرش صفحه به مقادیر اولیه constant/mock برمی‌گردد.
 */
export const db = {
  schemes: structuredClone(MOCK_SCHEMES),
  postApprovalStages: structuredClone(MOCK_POST_APPROVAL_STAGES),
  companies: structuredClone(MOCK_COMPANIES),
  staff: structuredClone(MOCK_STAFF),
  users: structuredClone(MOCK_MANAGED_USERS),
  loanRequests: structuredClone(MOCK_LOAN_REQUESTS),
  auditLogs: structuredClone(MOCK_AUDIT_LOGS),
  /** نام فایل‌های آپلودشده بر اساس شناسه */
  files: new Map<string, string>(),
  sequence: 100,
};

export const nextId = (prefix: string) => {
  db.sequence += 1;
  return `${prefix}-${db.sequence}`;
};

export const fileOf = (id: string) => ({ id, name: db.files.get(id) ?? id });

export const today = () => new Date().toISOString().slice(0, 10);

export const findUserByToken = (authorization: string | null) => {
  const token = authorization?.replace('Bearer ', '');
  return MOCK_USERS.find((user) => user.token === token);
};

/** طرح بدون اطلاعات (وقتی همه طرح‌ها حذف شده‌اند) */
const EMPTY_SCHEME: MockScheme = {
  id: 0,
  code: '',
  title: '',
  isActive: false,
  settings: {
    schemeId: 0,
    contractTypes: [],
    qardHasanRate: 0,
    murabahaRates: [],
    repaymentTermsMonths: [],
    salaryFromSepahMultiplierYes: 1,
    salaryFromSepahMultiplierNo: 1,
    contractDurationMonths: 12,
    graceMonthsAfterExpiry: 0,
    maxPlansPerCompany: 0,
    personnelIntroductionDelayMonths: 0,
    waitingPeriodDays: 0,
    usableTable: [],
    rowVersion: '',
    digitalApprovalEnabled: false,
  },
  reasons: {
    contractCancel: [],
    loanReject: [],
    remoteGrantDenied: [],
    documentType: [],
    loanCancel: [],
    personnelReject: [],
  },
};

/** محاسبات شرکت‌ها و وام‌ها فعلاً از اولین طرح خوانده می‌شود */
export const primaryScheme = () => db.schemes[0] ?? EMPTY_SCHEME;

/** لیست‌های کشویی (دلایل و انواع مستند) از اطلاعات پایه طرح خوانده می‌شوند */
export const lookupItems = (kind: MockReasonKind) =>
  primaryScheme()
    .reasons[kind].filter((reason) => reason.isActive)
    .map((reason) => ({ id: String(reason.id), title: reason.title ?? '' }));

export const lookupTitle = (kind: MockReasonKind, id: string) =>
  lookupItems(kind).find((item) => item.id === id)?.title;

/** طرح کلان یک شرکت (شرکت‌های قدیمی بدون طرح = طرح اول) */
export const schemeOf = (schemeId?: string) =>
  db.schemes.find((scheme) => String(scheme.id) === schemeId) ?? primaryScheme();

/** ضریب حقوق‌بگیر بانک سپه بودن شرکت */
export const sepahMultiplier = (scheme: MockScheme, sepahSalary: boolean) =>
  sepahSalary
    ? scheme.settings.salaryFromSepahMultiplierYes
    : scheme.settings.salaryFromSepahMultiplierNo;

const usableOf = (scheme: MockScheme, termMonths: number, contractType: 1 | 2, rate: number) =>
  scheme.settings.usableTable.find(
    (cell) =>
      cell.termMonths === termMonths && cell.contractType === contractType && cell.rate === rate,
  )?.usablePercent ?? 0;

/** طرح‌های قابل انتخاب از روی اطلاعات پایه ساخته می‌شوند (همان کاری که بک‌اند انجام می‌دهد) */
export const buildPlanOptions = (scheme: MockScheme = primaryScheme()): PlanOption[] => {
  const { repaymentTermsMonths: terms, murabahaRates, qardHasanRate } = scheme.settings;
  const qarz = terms.map((term, termIndex) => ({
    id: `qarz-${termIndex}`,
    type: 'qarz' as const,
    typeTitle: 'قرض‌الحسنه',
    rate: qardHasanRate,
    term,
    usable: usableOf(scheme, term, 1, qardHasanRate),
  }));
  const murabaha = murabahaRates.flatMap((rate, rateIndex) =>
    terms.map((term, termIndex) => ({
      id: `mur-${rateIndex}-${termIndex}`,
      type: 'murabaha' as const,
      typeTitle: 'مرابحه',
      rate,
      term,
      usable: usableOf(scheme, term, 2, rate),
    })),
  );
  return [...qarz, ...murabaha];
};
