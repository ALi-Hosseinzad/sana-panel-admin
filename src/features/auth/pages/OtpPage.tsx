import { ArrowRightOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

import logo from '@/assets/images/logo-sana.png';
import { Button } from '@/component/button';
import { Form } from '@/component/form';
import { OtpInput } from '@/component/input';
import { Typography } from '@/component/typography';
import { env } from '@/config/env';

interface OtpPageProps {
  onSubmit: (code: string) => Promise<void>;
  onBack: () => void;
}

const OTP_LENGTH = 6;

export const OtpPage = ({ onSubmit, onBack }: OtpPageProps) => {
  const [code, setCode] = useState('');
  const { mutate, isPending } = useMutation({
    mutationFn: onSubmit,
    onError: (error) => {
      if (!isAxiosError(error)) toast.error(error.message);
    },
  });
  const canVerify = code.length === OTP_LENGTH && /^\d+$/.test(code) && !isPending;

  return (
    <main
      aria-label="تأیید ورود"
      className="grid min-h-dvh grid-rows-[auto_1fr] bg-panel md:grid-cols-[2fr_3fr] md:grid-rows-1"
    >
      <div className="flex items-center gap-4 bg-[linear-gradient(150deg,var(--sana-sidebar-from),var(--sana-sidebar-to))] px-6 py-5 text-sidebar-text md:flex-col md:justify-center md:gap-6 md:p-10 md:text-center">
        <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-white p-2.5 md:size-24 md:rounded-2xl md:p-4">
          <img src={logo} alt="سانا" className="h-full w-full object-contain" />
        </div>
        <p className="m-0 text-sm font-bold md:text-xl">{env.appTitle}</p>
      </div>

      <section className="flex min-w-0 items-center justify-center px-6 py-10 md:px-12">
        <div className="w-full max-w-sm">
          <span className="mb-5 grid size-12 place-items-center rounded-xl border border-gold-soft-border bg-gold-soft text-2xl text-gold-soft-text">
            <SafetyCertificateOutlined aria-hidden />
          </span>
          <Typography as="title" level={1} size="xl" color="heading">
            تأیید ورود
          </Typography>
          <Typography as="paragraph" size="md" weight={400} color="soft" className="mt-2 mb-6">
            کد یک‌بارمصرف شش‌رقمی را وارد کنید.
          </Typography>
          <Form
            onFinish={() => {
              if (canVerify) mutate(code);
            }}
          >
            <OtpInput
              aria-label="کد یک‌بارمصرف"
              length={OTP_LENGTH}
              className="mb-5 grid w-full grid-cols-6"
              autoFocus
              disabled={isPending}
              onInput={(digits) => setCode(digits.join(''))}
            />
            <Button htmlType="submit" size="large" block loading={isPending} disabled={!canVerify}>
              تأیید و ورود
            </Button>
            <Button
              variant="text"
              icon={<ArrowRightOutlined />}
              className="mt-3"
              disabled={isPending}
              onClick={onBack}
            >
              بازگشت به ورود
            </Button>
          </Form>
        </div>
      </section>
    </main>
  );
};
