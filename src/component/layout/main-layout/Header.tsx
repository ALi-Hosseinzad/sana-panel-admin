import { LogoutOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { App, Tooltip } from 'antd';

import logoOmid from '@/assets/images/logo-omid.png';
import { useProfileStore } from '@/store/useProfileStore';
import { useThemeStore } from '@/store/useThemeStore';
import { dayjs, toPersianDigits } from '@/utils/date';

import { Button } from '../../button';

export interface HeaderProps {
  title: string;
  onLogout: () => void;
}

export const Header = ({ title, onLogout }: HeaderProps) => {
  const { modal } = App.useApp();
  const fullName = useProfileStore((state) => state.profile?.fullName);
  const mode = useThemeStore((state) => state.mode);
  const toggle = useThemeStore((state) => state.toggle);
  const today = `امروز: ${toPersianDigits(dayjs().formatJalali('dddd D MMMM YYYY'))}`;

  const confirmLogout = () =>
    modal.confirm({
      title: 'خروج از حساب',
      content: [fullName, 'آیا از خروج از سامانه اطمینان دارید؟'].filter(Boolean).join('، '),
      okText: 'خروج',
      okButtonProps: { danger: true },
      cancelText: 'انصراف',
      onOk: onLogout,
    });

  return (
    <header className="sana-no-print sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-[var(--sana-topbar-bg)] px-7 py-3.5 backdrop-blur-md max-[960px]:static max-[960px]:px-4 max-[960px]:py-3">
      <h1 className="m-0 text-[19px] font-extrabold text-heading">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="rounded-full border border-gold-soft-border bg-gold-soft px-3 py-[5px] text-xs font-semibold whitespace-nowrap text-heading">
          {today}
        </span>
        <Tooltip title={mode === 'dark' ? 'تم روشن' : 'تم تیره'}>
          <Button
            variant="text"
            shape="circle"
            aria-label="تغییر تم"
            icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggle}
          />
        </Tooltip>
        <Button variant="secondary" size="small" icon={<LogoutOutlined />} onClick={confirmLogout}>
          خروج
        </Button>
        <img src={logoOmid} alt="امید بوم" className="block h-10 w-auto max-sm:hidden" />
      </div>
    </header>
  );
};
