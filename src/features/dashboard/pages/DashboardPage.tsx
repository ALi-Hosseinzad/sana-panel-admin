import {
  CompanyCreditChart,
  CompanyRanking,
  ContractsByMonthTable,
  MonthlyPerformanceTable,
  PlanShareChart,
  RemovedCompaniesTable,
  ReportExports,
  RequestStatusChart,
  SummaryKpis,
} from '../components';

/** هر بخش سرویس مخصوص خودش را دارد */
export const DashboardPage = () => (
  <>
    <SummaryKpis />
    <div className="grid grid-cols-1 gap-x-[18px] lg:grid-cols-2">
      <RequestStatusChart />
      <PlanShareChart />
    </div>
    <CompanyCreditChart />
    <CompanyRanking />
    <ContractsByMonthTable />
    <MonthlyPerformanceTable />
    <RemovedCompaniesTable />
    <ReportExports />
  </>
);
