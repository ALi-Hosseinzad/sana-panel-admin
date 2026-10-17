import { ENDPOINTS } from '@/constant/endpoints';
import { http } from '@/services/http';
import { type LookupItem, type PageParams, type PaginatedResponse } from '@/types/common';

import { type AuditLog, type AuditLogFilters } from './types';

export const getAuditLogs = (params: AuditLogFilters & PageParams) =>
  http.get<PaginatedResponse<AuditLog>>(ENDPOINTS.AUDIT_LOGS.LIST, { params });

export const getAuditLogTypes = () => http.get<LookupItem[]>(ENDPOINTS.LOOKUPS.AUDIT_LOG_TYPES);

/** بازگردانی تغییر به حالت قبل (فقط برای ویرایش‌هایی که snapshot دارند) */
export const rollbackAuditLog = (id: string) =>
  http.post<AuditLog>(ENDPOINTS.AUDIT_LOGS.ROLLBACK(id));

export const exportAuditLogs = () =>
  http.download(ENDPOINTS.REPORTS.AUDIT_LOGS, 'گزارش-تغییرات.xlsx');
