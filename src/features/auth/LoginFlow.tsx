import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { panelProfileGet } from '@/api/generated/admin';

import { AuthLayout } from '@/component/layout';
import { ROUTES } from '@/constant/routes';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';

import { login, verifyOtp } from './api';
import { OtpStep } from './components/OtpStep';
import { LoginPage } from './pages/LoginPage';
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

  return (
    <AuthLayout>
      {challengeId === null ? (
        <LoginPage username={username} onSubmit={submitCredentials} />
      ) : (
        <OtpStep
          onSubmit={async (code) => completeLogin(await verifyOtp({ challengeId, code }))}
          onBack={() => setStep({ username, challengeId: null })}
        />
      )}
    </AuthLayout>
  );
};
