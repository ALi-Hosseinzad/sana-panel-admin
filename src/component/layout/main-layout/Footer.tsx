import { type ReactNode } from 'react';

export interface FooterProps {
  children?: ReactNode;
}

export const Footer = ({
  children = (
    <>
      توسعه‌دهنده این سامانه شرکت <b className="text-heading">امید بوم بانک سپه</b> است و کلیه حقوق
      مادی و معنوی آن متعلق به این شرکت می‌باشد.
    </>
  ),
}: FooterProps) => (
  <footer className="sana-no-print mt-6 border-t border-line bg-panel px-6 pt-[18px] pb-[22px] text-center text-xs text-ink-soft">
    {children}
  </footer>
);
