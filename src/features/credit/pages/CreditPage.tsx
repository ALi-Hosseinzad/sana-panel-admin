import { PanelCard } from '@/component/card';
import { useQueryParams } from '@/hooks/useQueryParams';
import { type StaffFilters } from '@/features/staff/types';
import { dayjs, ISO_DATE_FORMAT } from '@/utils/date';

import {
  CompanyLoanRequests,
  CreditFilters,
  CreditSummaryCard,
  EligibilityNotices,
  LoanRequestCard,
} from '../components';

export const CreditPage = () => {
  const { params, setParams } = useQueryParams();
  const companyId = params.companyId;
  // تاریخ مبنا پیش‌فرض امروز است و در آدرس نگه داشته می‌شود
  const date = params.date ?? dayjs().format(ISO_DATE_FORMAT);
  const filters: StaffFilters = { q: params.q, hireFrom: params.hireFrom, hireTo: params.hireTo };

  return (
    <>
      <PanelCard>
        <CreditFilters
          companyId={companyId}
          date={date}
          onCompanyChange={(id) => setParams({ companyId: id })}
          onDateChange={(value) => setParams({ date: value })}
        />
        {companyId && <EligibilityNotices companyId={companyId} date={date} />}
      </PanelCard>

      {companyId && (
        <>
          <CreditSummaryCard companyId={companyId} date={date} />
          {/* با تغییر شرکت، فرم و انتخاب‌ها از نو شروع می‌شوند */}
          <LoanRequestCard key={companyId} companyId={companyId} date={date} filters={filters} />
          <CompanyLoanRequests key={`requests-${companyId}`} companyId={companyId} />
        </>
      )}
    </>
  );
};
