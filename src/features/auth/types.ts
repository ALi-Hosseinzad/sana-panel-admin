/** بدنه ورود (LoginQuery) */
export interface LoginRequest {
  username: string;
  password: string;
  captchaToken: string;
  captchaValue: string;
}

export type LoginFormValues = Omit<LoginRequest, 'captchaToken'>;

export interface CaptchaResponse {
  captchaToken: string;
  image: string;
}

export interface AuthSessionResponse {
  token: string;
}

export interface OtpChallenge {
  challengeId: string;
}

export type LoginResponse = AuthSessionResponse | OtpChallenge;

export interface VerifyOtpRequest extends OtpChallenge {
  code: string;
}
