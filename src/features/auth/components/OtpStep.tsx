import { ArrowRightOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { Button } from '@/component/button';
import { Form } from '@/component/form';
import { OtpInput } from '@/component/input';
import { Typography } from '@/component/typography';

interface OtpStepProps {
  pending: boolean;
  onVerify: (code: string) => void;
  onBack: () => void;
}

const OTP_LENGTH = 6;

export const OtpStep = ({ pending, onVerify, onBack }: OtpStepProps) => {
  const [code, setCode] = useState('');
  const canVerify = code.length === OTP_LENGTH && /^\d+$/.test(code) && !pending;

  return (
    <div className="text-center">
      <span className="mx-auto mb-3 grid size-12 place-items-center rounded-xl border border-gold-soft-border bg-gold-soft text-2xl text-gold-soft-text">
        <SafetyCertificateOutlined aria-hidden />
      </span>
      <Typography as="title" level={2} size="xl" color="heading">
        تأیید ورود
      </Typography>
      <Typography as="paragraph" size="sm" weight={400} color="soft" className="mt-2 mb-5">
        کد یک‌بارمصرف شش‌رقمی را وارد کنید.
      </Typography>
      <Form
        onFinish={() => {
          if (canVerify) onVerify(code);
        }}
      >
        <OtpInput
          aria-label="کد یک‌بارمصرف"
          length={OTP_LENGTH}
          className="mb-5 grid w-full grid-cols-6"
          autoFocus
          disabled={pending}
          onInput={(digits) => setCode(digits.join(''))}
        />
        <Button htmlType="submit" size="large" block loading={pending} disabled={!canVerify}>
          تأیید و ورود
        </Button>
        <Button
          variant="text"
          icon={<ArrowRightOutlined />}
          className="mt-2"
          disabled={pending}
          onClick={onBack}
        >
          بازگشت به ورود
        </Button>
      </Form>
    </div>
  );
};
