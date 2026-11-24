import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { panelProfileGet } from '@/api/generated/admin';

import { ROUTES } from '@/constant/routes';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';

import { login, verifyOtp } from './api';
import { LoginPage } from './pages/LoginPage';
import { OtpPage } from './pages/OtpPage';
import { type AuthSessionResponse, type LoginRequest } from './types';

export const LoginFlow = () => {
  const [step, setStep] = useState<{ username: string; challengeId: string | null }>({
    username: '',
    challengeId: null,
  });
  const { username, challengeId } = step;
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.login);
  const setProfile = useProfileStore((state) => state.setProfile);

  const completeLogin = async ({ token }: AuthSessionResponse) => {
    setToken(token);
    const profile = await panelProfileGet();
    setProfile(profile);
    toast.success(`${profile.fullName ?? ''} خوش آمدید`);
    void navigate(ROUTES.HOME, { replace: true });
  };

  const submitCredentials = async (values: LoginRequest) => {
    const response = await login(values);
    if ('challengeId' in response) {
      setStep({ username: values.username, challengeId: response.challengeId });
      return;
    }
    await completeLogin(response);
  };

  if (challengeId !== null) {
    return (
      <OtpPage
        onSubmit={async (code) => completeLogin(await verifyOtp({ challengeId, code }))}
        onBack={() => setStep({ username, challengeId: null })}
      />
    );
  }

  return <LoginPage username={username} onSubmit={submitCredentials} />;
};
