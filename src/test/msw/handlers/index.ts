import { authHandlers } from './auth';
import { baseInfoHandlers } from './baseInfo';
import { companyHandlers } from './companies';
import { creditHandlers } from './credit';
import { creditApprovalHandlers } from './creditApprovals';
import { dashboardHandlers } from './dashboard';
import { fileHandlers } from './files';
import { lookupHandlers } from './lookups';
import { managerApprovalHandlers } from './managerApprovals';
import { reportHandlers } from './reports';
import { staffHandlers } from './staff';

export const handlers = [
  ...authHandlers,
  ...baseInfoHandlers,
  ...lookupHandlers,
  ...fileHandlers,
  ...companyHandlers,
  ...staffHandlers,
  ...creditHandlers,
  ...managerApprovalHandlers,
  ...creditApprovalHandlers,
  ...dashboardHandlers,
  ...reportHandlers,
];
