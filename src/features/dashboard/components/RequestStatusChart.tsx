import { useQuery } from '@tanstack/react-query';

import { PanelCard } from '@/component/card';
import { Skeleton } from '@/component/loading';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { useChartTheme } from '@/hooks/useChartTheme';

import { getRequestStatus } from '../api';

import { DonutChart } from './DonutChart';

export const RequestStatusChart = () => {
  const chart = useChartTheme();
  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.REQUEST_STATUS,
    queryFn: getRequestStatus,
  });

  return (
    <PanelCard title="وضعیت درخواست‌ها" subtitle="نسبت درخواست‌های تأییدشده، در انتظار و ردشده">
      {isPending || !data ? (
        <Skeleton variant="panel" rows={5} />
      ) : (
        <DonutChart
          data={data.map((item) => ({ title: item.title, count: item.count }))}
          colors={data.map((item) => chart.status[item.key])}
        />
      )}
    </PanelCard>
  );
};
