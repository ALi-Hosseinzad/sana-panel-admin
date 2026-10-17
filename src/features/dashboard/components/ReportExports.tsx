import { DownloadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/component/button';
import { PanelCard } from '@/component/card';

import { downloadReport, REPORT_EXPORTS } from '../api';

type Report = (typeof REPORT_EXPORTS)[number];

const ExportButton = ({ report }: { report: Report }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => downloadReport(report.path, report.fileName),
  });
  return (
    <Button size="small" icon={<DownloadOutlined />} loading={isPending} onClick={() => mutate()}>
      {report.title}
    </Button>
  );
};

export const ReportExports = () => (
  <PanelCard
    title="گزارش‌های خروجی (اکسل)"
    subtitle="هر فایل شامل جزئیات کامل آن بخش از سامانه است و مستقیماً در Excel باز می‌شود."
  >
    <div className="flex flex-wrap gap-2.5">
      {REPORT_EXPORTS.map((report) => (
        <ExportButton key={report.key} report={report} />
      ))}
    </div>
  </PanelCard>
);
