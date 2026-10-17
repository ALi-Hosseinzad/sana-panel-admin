import { useQueryParams } from '@/hooks/useQueryParams';

import { CreditApprovalCard } from '../components';

export const CreditApprovalPage = () => {
  const { params, setParams } = useQueryParams();

  return (
    <CreditApprovalCard
      companyId={params.companyId}
      onCompanyChange={(companyId) => setParams({ companyId })}
    />
  );
};
