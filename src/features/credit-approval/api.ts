import { ENDPOINTS } from '@/constant/endpoints';
import { type DecisionPayload, type DecisionType } from '@/features/manager-approval/types';
import { http } from '@/services/http';
import { type PageParams, type PaginatedResponse } from '@/types/common';

import {
  type CreditApprovalFilters,
  type CreditApprovalItem,
  type PostStagePayload,
} from './types';

export const getCreditApprovals = (params: CreditApprovalFilters & PageParams) =>
  http.get<PaginatedResponse<CreditApprovalItem>>(ENDPOINTS.CREDIT_APPROVALS.LIST, { params });

export const approveCredit = (body: DecisionPayload) =>
  http.post<{ updated: number }, DecisionPayload>(ENDPOINTS.CREDIT_APPROVALS.APPROVE, body);

/** رد درخواست‌ها؛ دلیل رد اجباری است */
export const rejectCredit = (body: DecisionPayload) =>
  http.post<{ updated: number }, DecisionPayload>(ENDPOINTS.CREDIT_APPROVALS.REJECT, body);

export const submitCreditDecision = (type: DecisionType, body: DecisionPayload) =>
  type === 'approve' ? approveCredit(body) : rejectCredit(body);

/** تغییر مرحله پس از تأیید */
export const updatePostStage = (id: string, body: PostStagePayload) =>
  http.put<CreditApprovalItem, PostStagePayload>(ENDPOINTS.CREDIT_APPROVALS.POST_STAGE(id), body);
