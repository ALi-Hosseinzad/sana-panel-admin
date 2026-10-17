import { authHandlers } from './auth';
import { baseInfoHandlers } from './baseInfo';
import { companyHandlers } from './companies';
import { fileHandlers } from './files';
import { lookupHandlers } from './lookups';
import { staffHandlers } from './staff';

export const handlers = [
  ...authHandlers,
  ...baseInfoHandlers,
  ...lookupHandlers,
  ...fileHandlers,
  ...companyHandlers,
  ...staffHandlers,
];
