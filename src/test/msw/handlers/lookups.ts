import { delay, http } from 'msw';

import { ENDPOINTS, FACILITY } from '@/constant/endpoints';
import { type MockReasonKind } from '@/constant/mock';
import { MOCK_ENUMS } from '@/constant/mock/enums';

import { buildPlanOptions, db, lookupItems, schemeOf } from '../db';
import { api, json } from '../utils';

/** لیست ساده‌ای که از اطلاعات پایه طرح خوانده می‌شود */
const lookupList = (path: string, kind: MockReasonKind) =>
  http.get(api(path), async () => {
    await delay(150);
    return json(lookupItems(kind));
  });

export const lookupHandlers = [
  // عنوان enumها با داده واقعی‌تر از ماک تولیدشده (تصادفی)
  http.get(api(`${FACILITY}/Lookups/Enums`), async () => {
    await delay(150);
    return json(MOCK_ENUMS);
  }),

  lookupList(ENDPOINTS.LOOKUPS.CANCEL_REASONS, 'contractCancel'),
  lookupList(ENDPOINTS.LOOKUPS.REJECT_REASONS, 'loanReject'),
  lookupList(ENDPOINTS.LOOKUPS.NO_GRANT_REASONS, 'remoteGrantDenied'),
  lookupList(ENDPOINTS.LOOKUPS.AVG_DOC_TYPES, 'documentType'),

  /** طرح‌های قابل انتخاب یک طرح کلان + سقف تعداد طرح هر شرکت */
  http.get(api(ENDPOINTS.LOOKUPS.PLANS), async ({ request }) => {
    await delay(200);
    const scheme = schemeOf(new URL(request.url).searchParams.get('schemeId') ?? undefined);
    return json({
      maxPlans: scheme.settings.maxPlansPerCompany,
      items: buildPlanOptions(scheme),
    });
  }),

  /** کشویی طرح‌های کلان برای فرم شرکت */
  http.get(api(ENDPOINTS.LOOKUPS.SCHEMES), async () => {
    await delay(150);
    return json(
      db.schemes
        .filter((scheme) => scheme.isActive)
        .map((scheme) => ({ id: String(scheme.id), title: scheme.title })),
    );
  }),

  http.get(api(ENDPOINTS.LOOKUPS.COMPANIES), async ({ request }) => {
    await delay(150);
    const includeInactive = new URL(request.url).searchParams.get('includeInactive') === 'true';
    const list = db.companies.filter(
      (item) => !item.deleted && (includeInactive || item.status === 'active'),
    );
    return json(list.map((item) => ({ id: item.id, title: item.name })));
  }),

  http.get(api(ENDPOINTS.LOOKUPS.POST_APPROVAL_STAGES), async () => {
    await delay(150);
    return json(db.postApprovalStages);
  }),
];
