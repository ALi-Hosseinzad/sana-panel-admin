import { delay, http, HttpResponse } from 'msw';

import { ENDPOINTS } from '@/constant/endpoints';
import { type MockCompany } from '@/constant/mock';
import {
  type CancelContractPayload,
  type CompanyDetail,
  type CompanyListItem,
  type CompanyPayload,
  type MonthlyAverage,
  type SaveAveragesPayload,
} from '@/features/companies/types';

import { buildPlanOptions, db, fileOf, findUserByToken, nextId, toLookup, today } from '../db';
import { api } from '../utils';

const notFound = () => HttpResponse.json({ message: 'شرکت یافت نشد.' }, { status: 404 });

const findCompany = (id: unknown) => db.companies.find((item) => item.id === id && !item.deleted);

const toListItem = (company: MockCompany): CompanyListItem => ({
  id: company.id,
  name: company.name,
  nationalId: company.nationalId,
  agreementNo: company.agreementNo,
  contractDate: company.contractDate,
  planCount: company.planIds.length,
  registeredBy: company.registeredBy,
  status: company.status,
  cancelDate: company.cancelDate,
  cancelReason: company.cancelReason,
});

const toDetail = (company: MockCompany): CompanyDetail => ({
  id: company.id,
  name: company.name,
  nationalId: company.nationalId,
  agreementNo: company.agreementNo,
  accountNo: company.accountNo,
  contractDate: company.contractDate,
  accountOpenDate: company.accountOpenDate,
  sepahSalary: company.sepahSalary,
  agreementFile: company.agreementFile,
  planIds: company.planIds,
});

/** محاسبه ساده مانده اعتبار (در بک‌اند واقعی بر اساس وام‌های تخصیص‌یافته محاسبه می‌شود) */
const buildAverages = (company: MockCompany): MonthlyAverage[] => {
  const plans = buildPlanOptions().filter((plan) => company.planIds.includes(plan.id));
  const usablePercent = plans.length
    ? plans.reduce((sum, plan) => sum + plan.usable, 0) / plans.length
    : 0;
  const multiplier =
    db.baseInfo.sepahEnabled && company.sepahSalary ? db.baseInfo.sepahMultiplier : 1;

  let cumulative = 0;
  return company.averages.map((average, index) => {
    cumulative += average ?? 0;
    return {
      month: index + 1,
      average,
      remainingCredit:
        average === null ? null : Math.round((cumulative * usablePercent * multiplier) / 100),
    };
  });
};

const userName = (request: Request) =>
  findUserByToken(request.headers.get('Authorization'))?.profile.fullName ?? '—';

export const companyHandlers = [
  http.get(api(ENDPOINTS.COMPANIES.LIST), async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
    const list = db.companies.filter((item) => !item.deleted);
    const start = (page - 1) * pageSize;
    return HttpResponse.json({
      items: list.slice(start, start + pageSize).map(toListItem),
      total: list.length,
      page,
      pageSize,
    });
  }),

  http.post(api(ENDPOINTS.COMPANIES.LIST), async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as CompanyPayload;
    const user = findUserByToken(request.headers.get('Authorization'));
    const company: MockCompany = {
      ...body,
      id: nextId('c'),
      agreementFile: body.agreementFileId ? fileOf(body.agreementFileId) : null,
      registeredBy: user ? `${user.profile.branch ?? ''} — ${user.profile.fullName}` : '—',
      status: 'active',
      deleted: false,
      averages: Array.from({ length: 12 }, () => null),
      averageDocs: [],
    };
    db.companies.unshift(company);
    return HttpResponse.json(toDetail(company), { status: 201 });
  }),

  http.get(api(ENDPOINTS.COMPANIES.DETAIL(':id')), async ({ params }) => {
    await delay(250);
    const company = findCompany(params.id);
    return company ? HttpResponse.json(toDetail(company)) : notFound();
  }),

  http.put(api(ENDPOINTS.COMPANIES.DETAIL(':id')), async ({ params, request }) => {
    await delay(400);
    const company = findCompany(params.id);
    if (!company) return notFound();
    const { agreementFileId, ...body } = (await request.json()) as CompanyPayload;
    Object.assign(company, body);
    if (agreementFileId && agreementFileId !== company.agreementFile?.id) {
      company.agreementFile = fileOf(agreementFileId);
    }
    return HttpResponse.json(toDetail(company));
  }),

  http.delete(api(ENDPOINTS.COMPANIES.DETAIL(':id')), async ({ params }) => {
    await delay(300);
    const company = findCompany(params.id);
    if (!company) return notFound();
    company.deleted = true;
    return new HttpResponse(null, { status: 204 });
  }),

  http.post(api(ENDPOINTS.COMPANIES.CANCEL(':id')), async ({ params, request }) => {
    await delay(300);
    const company = findCompany(params.id);
    if (!company) return notFound();
    const body = (await request.json()) as CancelContractPayload;
    company.status = 'cancelled';
    company.cancelDate = body.cancelDate;
    company.cancelReason = toLookup(db.baseInfo.cancelReasons).find(
      (reason) => reason.id === body.reasonId,
    )?.title;
    return new HttpResponse(null, { status: 204 });
  }),

  http.get(api(ENDPOINTS.COMPANIES.AVERAGES(':id')), async ({ params }) => {
    await delay(250);
    const company = findCompany(params.id);
    return company ? HttpResponse.json(buildAverages(company)) : notFound();
  }),

  http.post(api(ENDPOINTS.COMPANIES.AVERAGES(':id')), async ({ params, request }) => {
    await delay(400);
    const company = findCompany(params.id);
    if (!company) return notFound();
    const body = (await request.json()) as SaveAveragesPayload;
    body.items.forEach((item) => {
      company.averages[item.month - 1] = item.average;
    });
    company.averageDocs.unshift({
      id: nextId('d'),
      createdAt: today(),
      months: body.items.map((item) => item.month),
      docType:
        toLookup(db.baseInfo.avgDocTypes).find((type) => type.id === body.docTypeId)?.title ?? '—',
      file: fileOf(body.fileId),
      note: body.note,
      createdBy: userName(request),
    });
    return HttpResponse.json(buildAverages(company));
  }),

  http.get(api(ENDPOINTS.COMPANIES.AVERAGE_DOCS(':id')), async ({ params }) => {
    await delay(200);
    const company = findCompany(params.id);
    return company ? HttpResponse.json(company.averageDocs) : notFound();
  }),
];
