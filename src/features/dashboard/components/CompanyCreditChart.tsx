import { Column } from '@ant-design/charts';
import { useQuery } from '@tanstack/react-query';

import { PanelCard } from '@/component/card';
import { Skeleton } from '@/component/loading';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { useChartTheme } from '@/hooks/useChartTheme';
import { toPersianDigits } from '@/utils/date';
import { formatRial } from '@/utils/number';

import { getCompanyCredit } from '../api';

import { ChartLegend } from './ChartLegend';

const SERIES = ['اعتبار ایجادشده', 'اعتبار تخصیص‌یافته'];

/** نمایش فشرده محور (مثل «۲۱۴ م») */
const compact = (value: number) => {
  if (value >= 1e9) return toPersianDigits(`${Math.round(value / 1e8) / 10} میلیارد`);
  if (value >= 1e6) return toPersianDigits(`${Math.round(value / 1e6)} م`);
  return toPersianDigits(value);
};

export const CompanyCreditChart = () => {
  const chart = useChartTheme();
  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.COMPANY_CREDIT,
    queryFn: getCompanyCredit,
  });

  const rows = (data ?? []).flatMap((item) => [
    { companyName: item.companyName, series: SERIES[0], value: item.created },
    { companyName: item.companyName, series: SERIES[1], value: item.disbursed },
  ]);

  const renderBody = () => {
    if (isPending) return <Skeleton variant="panel" rows={6} />;
    if (!rows.length) return <p className="text-xs text-ink-soft">هنوز شرکتی ثبت نشده است.</p>;
    return (
      <>
        <ChartLegend
          items={SERIES.map((label, index) => ({ label, color: chart.pair[index] ?? '' }))}
        />
        <Column
          data={rows}
          xField="companyName"
          yField="value"
          colorField="series"
          group
          height={340}
          theme={chart.theme}
          scale={{ color: { domain: SERIES, range: chart.pair } }}
          style={{
            radiusTopLeft: 4,
            radiusTopRight: 4,
            maxWidth: 32,
            stroke: chart.surface,
            lineWidth: 2,
          }}
          axis={{
            x: { labelFontFamily: chart.fontFamily, title: false },
            y: {
              labelFormatter: compact,
              labelFontFamily: chart.fontFamily,
              title: false,
              gridLineDash: [2, 4],
            },
          }}
          legend={false}
          tooltip={{ items: [{ channel: 'y', valueFormatter: (v: number) => formatRial(v) }] }}
        />
      </>
    );
  };

  return (
    <PanelCard
      title="اعتبار ایجادشده در مقابل تخصیص‌یافته به تفکیک شرکت"
      subtitle="مقایسه اعتبار ایجادشده (تجمعی) و میزان تخصیص‌یافته هر شرکت"
    >
      {renderBody()}
    </PanelCard>
  );
};
