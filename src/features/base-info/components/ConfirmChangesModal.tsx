import { Modal } from '@/component/modal';
import { Typography } from '@/component/typography';

interface ConfirmChangesModalProps {
  changes: string[];
  open: boolean;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** نمایش فهرست تغییرات قبل از ذخیره */
export const ConfirmChangesModal = ({
  changes,
  open,
  loading,
  onConfirm,
  onCancel,
}: ConfirmChangesModalProps) => (
  <Modal
    title="تأیید تغییرات اطلاعات پایه"
    open={open}
    okText="تأیید و ذخیره"
    confirmLoading={loading}
    onOk={onConfirm}
    onCancel={onCancel}
  >
    <Typography as="paragraph" size="sm" weight={400} color="soft" className="mb-2">
      تغییرات زیر در اطلاعات پایه اعمال خواهد شد:
    </Typography>
    <ul className="m-0 list-disc ps-5 text-[13px] leading-8 text-ink">
      {changes.map((change) => (
        <li key={change}>{change}</li>
      ))}
    </ul>
  </Modal>
);
