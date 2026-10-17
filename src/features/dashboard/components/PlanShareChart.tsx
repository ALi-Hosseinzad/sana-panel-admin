import { useQuery } from '@tanstack/react-query';

import { PanelCard } from '@/component/card';
import { Skeleton } from '@/component/loading';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { useChartTheme } from '@/hooks/useChartTheme';
import { CHART_MAX_CATEGORIES } from '@/theme/chartPalette';

import { getPlanShare } from '../api';
import { type PlanShare } from '../types';

import { DonutChart, type DonutItem } from './DonutChart';

/** بیش از ۵ طرح در «سایر» جمع می‌شود تا رنگ‌ها چرخشی تکرار نشوند */
const foldOthers = (items: PlanShare[]): DonutItem[] => {
  const sorted = [...items].sort((a, b) => b.count - a.count);
  if (sorted.length <= CHART_MAX_CATEGORIES) {
    return sorted.map((item) => ({ title: item.planTitle, count: item.count }));
  }
  const head = sorted.slice(0, CHART_MAX_CATEGORIES - 1);
  const others = sorted.slice(CHART_MAX_CATEGORIES - 1).reduce((sum, item) => sum + item.count, 0);
  return [
    ...head.map((item) => ({ title: item.planTitle, count: item.count })),
    { title: 'سایر', count: others },
  ];
};

export const PlanShareChart = () => {
  const chart = useChartTheme();
  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.PLAN_SHARE,
    queryFn: getPlanShare,
  });

  const renderBody = () => {
    if (isPending) return <Skeleton variant="panel" rows={5} />;
    if (!data?.length) return <p className="text-xs text-ink-soft">هنوز درخواستی ثبت نشده است.</p>;
    return <DonutChart data={foldOthers(data)} colors={chart.categorical} />;
  };

  return (
    <PanelCard
      title="سهم هر طرح از تعداد درخواست‌ها"
      subtitle="محبوبیت هر یک از طرح‌های قرض‌الحسنه/مرابحه در میان درخواست‌ها"
    >
      {renderBody()}
    </PanelCard>
  );
};
