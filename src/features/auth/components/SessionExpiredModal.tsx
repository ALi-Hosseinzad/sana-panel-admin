import { Button } from '@/component/button';
import { Modal } from '@/component/modal';
import { resetSession } from '@/store/session';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * مودال پایان نشست (۴۰۱). دکمه «متوجه شدم»، ضربدر و Esc همه همان خروج را انجام می‌دهند؛
 * با خالی شدن توکن کاربر به صفحه ورود می‌رود. کلیک بیرون مودال غیرفعال است.
 */
export const SessionExpiredModal = () => {
  const open = useAuthStore((state) => state.sessionExpired);

  return (
    <Modal
      open={open}
      title="پایان نشست"
      width={420}
      onCancel={resetSession}
      footer={
        <Button variant="primary" block onClick={resetSession}>
          متوجه شدم
        </Button>
      }
    >
      <p className="my-2 text-[13px] leading-7">
        زمان فعالیت شما به پایان رسید، لطفاً مجدداً وارد سامانه شوید.
      </p>
    </Modal>
  );
};
