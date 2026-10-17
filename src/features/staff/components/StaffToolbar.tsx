import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/component/button';
import { UploadButton } from '@/component/upload-button';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { toPersianDigits } from '@/utils/date';

import { downloadStaffSample, importStaff } from '../api';

interface StaffToolbarProps {
  companyId: string;
  onCreate: () => void;
}

/** دکمه‌های افزودن، دانلود فایل نمونه و بارگذاری گروهی پرسنل */
export const StaffToolbar = ({ companyId, onCreate }: StaffToolbarProps) => {
  const queryClient = useQueryClient();

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: downloadStaffSample,
  });

  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => importStaff(companyId, file),
    onSuccess: ({ added }) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF.ALL });
      toast.success(`${toPersianDigits(added)} نفر اضافه شد.`);
    },
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="small" icon={<PlusOutlined />} onClick={onCreate}>
        افزودن پرسنل
      </Button>
      <Button
        variant="secondary"
        size="small"
        icon={<DownloadOutlined />}
        loading={isDownloading}
        onClick={() => download()}
      >
        دانلود نمونه فایل
      </Button>
      <UploadButton size="small" accept=".xlsx" loading={isUploading} onSelect={upload}>
        آپلود فایل اکسل پرسنل
      </UploadButton>
    </div>
  );
};
