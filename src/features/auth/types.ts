import { type UserProfile } from '@/types/common';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  profile: UserProfile;
}
