import { Pie } from '@ant-design/charts';

import { useChartTheme } from '@/hooks/useChartTheme';
import { toPersianDigits } from '@/utils/date';

import { ChartLegend } from './ChartLegend';

export interface DonutItem {
  title: string;
  count: number;
}

interface DonutChartProps {
  data: DonutItem[];
  colors: string[];
}

/** نمودار دونات با لیبل مستقیم و راهنما (رنگ هرگز تنها نشانه نیست) */
export const DonutChart = ({ data, colors }: DonutChartProps) => {
  const chart = useChartTheme();
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      <Pie
        data={data}
        angleField="count"
        colorField="title"
        innerRadius={0.62}
        height={280}
        theme={chart.theme}
        scale={{ color: { domain: data.map((item) => item.title), range: colors } }}
        style={{ stroke: chart.surface, lineWidth: 2 }}
        label={{
          text: (item: DonutItem) => (item.count ? toPersianDigits(item.count) : ''),
          style: { fontFamily: chart.fontFamily, fontWeight: 700 },
        }}
        legend={false}
        tooltip={{
          title: 'title',
          items: [
            { field: 'count', name: 'تعداد', valueFormatter: (v: number) => toPersianDigits(v) },
          ],
        }}
        annotations={[
          {
            type: 'text',
            style: {
              text: toPersianDigits(total),
              x: '50%',
              y: '46%',
              textAlign: 'center',
              fontSize: 22,
              fontWeight: 800,
              fontFamily: chart.fontFamily,
              fill: chart.textColor,
            },
          },
        ]}
      />
      <ChartLegend
        items={data.map((item, index) => ({
          label: item.title,
          color: colors[index] ?? colors[0] ?? '',
          value: item.count,
        }))}
      />
    </>
  );
};
