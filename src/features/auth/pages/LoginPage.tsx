import { LoginOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { panelProfileGet } from '@/api/generated/admin';

import { Button } from '@/component/button';
import { NoticeCard } from '@/component/card';
import { Form, FormItem } from '@/component/form';
import { PasswordInput, TextInput } from '@/component/input';
import { Spinner } from '@/component/loading';
import { Typography } from '@/component/typography';
import { QUERY_KEYS } from '@/constant/queryKeys';
import { ROUTES } from '@/constant/routes';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';

import { getCaptcha, login, verifyOtp } from '../api';
import { OtpStep } from '../components/OtpStep';
import { type AuthSessionResponse, type LoginFormValues } from '../types';

export const LoginPage = () => {
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [form] = Form.useForm<LoginFormValues>();
  const captchaValue = Form.useWatch('captchaValue', form)?.trim();
  const captcha = useQuery({
    queryKey: QUERY_KEYS.CAPTCHA,
    queryFn: ({ signal }) => getCaptcha(signal),
    enabled: challengeId === null,
    gcTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  const captchaReady = captcha.isSuccess && !captcha.isFetching;
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.login);
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    if (captcha.errorUpdatedAt) {
      toast.error('دریافت تصویر کپچا ناموفق بود.', { id: 'captcha-error' });
    }
  }, [captcha.errorUpdatedAt]);

  const completeLogin = async ({ token }: AuthSessionResponse) => {
    setToken(token);
    const profile = await panelProfileGet();
    setProfile(profile);
    toast.success(`${profile.fullName ?? ''} خوش آمدید`);
    void navigate(ROUTES.HOME, { replace: true });
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      if ('challengeId' in response) {
        form.resetFields(['password', 'captchaValue']);
        setChallengeId(response.challengeId);
        return;
      }
      await completeLogin(response);
    },
  });
  const otp = useMutation({
    mutationFn: verifyOtp,
    onSuccess: completeLogin,
    onError: (error) => {
      if (!isAxiosError(error)) toast.error(error.message);
    },
  });

  if (challengeId !== null) {
    return (
      <OtpStep
        pending={otp.isPending}
        onVerify={(code) => otp.mutate({ challengeId, code })}
        onBack={() => {
          setChallengeId(null);
          void captcha.refetch();
        }}
      />
    );
  }

  const invalidCredentials = isAxiosError(error) && error.response?.status === 401;

  return (
    <>
      <Typography as="title" level={2} size="xl" color="heading" align="center" className="mb-6">
        ورود به سامانه
      </Typography>
      <Form<LoginFormValues>
        form={form}
        onFinish={(values) => {
          const value = values.captchaValue?.trim();
          if (captchaReady && value && !isPending) {
            mutate({ ...values, captchaValue: value, captchaToken: captcha.data.captchaToken });
          }
        }}
        requiredMark={false}
      >
        <FormItem name="username" label="نام کاربری" required>
          <TextInput prefix={<UserOutlined />} placeholder="نام کاربری" autoComplete="username" />
        </FormItem>
        <FormItem name="password" label="رمز عبور" required>
          <PasswordInput />
        </FormItem>
        <FormItem name="captchaValue" label="کد امنیتی" required>
          <TextInput
            placeholder="کد امنیتی"
            disabled={!captchaReady}
            suffix={
              <span className="flex h-8 w-24 items-center justify-center">
                {captcha.isFetching && <Spinner />}
                {captchaReady && (
                  <img
                    src={captcha.data.image}
                    alt="تصویر کپچا"
                    className="h-8 w-24 rounded object-contain"
                  />
                )}
                {captcha.isError && !captcha.isFetching && (
                  <Button
                    variant="text"
                    size="small"
                    icon={<ReloadOutlined />}
                    aria-label="تلاش مجدد برای دریافت کپچا"
                    onClick={() => void captcha.refetch()}
                  />
                )}
              </span>
            }
          />
        </FormItem>
        {invalidCredentials && (
          <NoticeCard type="error">نام کاربری یا رمز عبور اشتباه است.</NoticeCard>
        )}
        <Button
          variant="primary"
          htmlType="submit"
          size="large"
          block
          icon={<LoginOutlined />}
          loading={isPending}
          disabled={!captchaReady || !captchaValue || isPending}
        >
          ورود
        </Button>
      </Form>
    </>
  );
};
