export const QUERY_KEYS = {
  PROFILE: ['profile'],
  BASE_INFO: ['base-info'],
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
} as const;
