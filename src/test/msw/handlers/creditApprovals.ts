import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';
import { type LoanStatus } from '@/constant/loanStatus';
import { type MockLoanRequest } from '@/constant/mock';
import { type PostStagePayload } from '@/features/credit-approval/types';
import { type DecisionPayload } from '@/features/manager-approval/types';

import { db, fileOf, lookupTitle, today } from '../db';
import { api } from '../utils';

/** درخواست‌هایی که هنوز در مرحله مدیر شرکت هستند یا توسط او رد شده‌اند اینجا نمایش داده نمی‌شوند */
const HIDDEN: LoanStatus[] = ['pending_manager', 'rejected_manager'];

const companyName = (id: string) => db.companies.find((item) => item.id === id)?.name ?? '—';

const toItem = (item: MockLoanRequest) => ({
  id: item.id,
  companyName: companyName(item.companyId),
  staffName: item.staffName,
  planTitle: item.planTitle,
  amount: item.amount,
  createdAt: item.createdAt,
  decidedAt: item.decidedAt,
  note: item.note,
  file: item.file,
  status: item.status,
  postStageId: item.postStageId,
});

const decide = (path: string, nextStatus: LoanStatus) =>
  http.post(api(path), async ({ request }) => {
    await delay(350);
    const body = (await request.json()) as DecisionPayload;
    if (nextStatus === 'rejected' && !body.reasonId) {
      return HttpResponse.json({ message: 'انتخاب دلیل رد اجباری است.' }, { status: 422 });
    }
    const targets = db.loanRequests.filter(
      (item) => body.requestIds.includes(item.id) && item.status === 'pending_credit',
    );
    if (!targets.length) {
      return HttpResponse.json({ message: 'درخواستی در انتظار یافت نشد.' }, { status: 404 });
    }
    targets.forEach((item) => {
      item.status = nextStatus;
      item.decidedAt = today();
      item.note = body.note;
      if (body.fileId) item.file = fileOf(body.fileId);
      if (body.reasonId) item.rejectReason = lookupTitle('rejectReasons', body.reasonId);
    });
    return HttpResponse.json({ updated: targets.length });
  });

export const creditApprovalHandlers = [
  http.get(api(ENDPOINTS.CREDIT_APPROVALS.LIST), async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const companyId = url.searchParams.get('companyId');
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
    const list = db.loanRequests.filter(
      (item) => !HIDDEN.includes(item.status) && (!companyId || item.companyId === companyId),
    );
    const start = (page - 1) * pageSize;
    return HttpResponse.json({
      items: list.slice(start, start + pageSize).map(toItem),
      total: list.length,
      page,
      pageSize,
    });
  }),

  decide(ENDPOINTS.CREDIT_APPROVALS.APPROVE, 'approved'),
  decide(ENDPOINTS.CREDIT_APPROVALS.REJECT, 'rejected'),

  http.put(api(ENDPOINTS.CREDIT_APPROVALS.POST_STAGE(':id')), async ({ params, request }) => {
    await delay(250);
    const item = db.loanRequests.find((entry) => entry.id === params.id);
    if (item?.status !== 'approved') {
      return HttpResponse.json(
        { message: 'مرحله فقط برای درخواست‌های تأییدشده قابل تغییر است.' },
        { status: 422 },
      );
    }
    const body = (await request.json()) as PostStagePayload;
    const stage = db.postApprovalStages.find((entry) => entry.id === body.stageId);
    if (stage?.requiresReason) {
      const reason = body.noGrantReasonId && lookupTitle('noGrantReasons', body.noGrantReasonId);
      if (!reason) {
        return HttpResponse.json(
          { message: 'علت عدم اعطای تسهیلات غیرحضوری را انتخاب کنید.' },
          { status: 422 },
        );
      }
      item.note = reason;
    }
    item.postStageId = stage?.id;
    return HttpResponse.json(toItem(item));
  }),
];
