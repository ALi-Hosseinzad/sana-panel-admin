export const QUERY_KEYS = {
  PROFILE: ['profile'],
  BASE_INFO: {
    GENERAL: ['base-info', 'general'],
    MURABAHA_RATES: ['base-info', 'murabaha-rates'],
    TERMS: ['base-info', 'terms'],
    USABLE_MATRIX: ['base-info', 'usable-matrix'],
  },
  LOOKUPS: {
    CANCEL_REASONS: ['lookups', 'cancel-reasons'],
    REJECT_REASONS: ['lookups', 'reject-reasons'],
    NO_GRANT_REASONS: ['lookups', 'no-grant-reasons'],
    AVG_DOC_TYPES: ['lookups', 'avg-doc-types'],
    PLANS: ['lookups', 'plans'],
    COMPANIES: ['lookups', 'companies'],
  },
  COMPANIES: {
    ALL: ['companies'],
    LIST: (page: number, pageSize: number) => ['companies', 'list', page, pageSize],
    DETAIL: (id: string) => ['companies', 'detail', id],
    AVERAGES: (id: string) => ['companies', 'averages', id],
    AVERAGE_DOCS: (id: string) => ['companies', 'average-docs', id],
  },
  CREDIT: {
    ALL: ['credit'],
    ELIGIBILITY: (companyId: string, date: string) => ['credit', 'eligibility', companyId, date],
    SUMMARY: (companyId: string, date: string) => ['credit', 'summary', companyId, date],
    LOAN_REQUESTS: (companyId: string, page: number) => [
      'credit',
      'loan-requests',
      companyId,
      page,
    ],
  },
  MANAGER_APPROVALS: {
    ALL: ['manager-approvals'],
    LIST: (companyId: string, page: number) => ['manager-approvals', companyId, page],
  },
  STAFF: {
    ALL: ['staff'],
    LIST: (companyId: string, filters: object, page: number) => [
      'staff',
      'list',
      companyId,
      filters,
      page,
    ],
    DETAIL: (companyId: string, id: string) => ['staff', 'detail', companyId, id],
  },
} as const;
