import { ROLES } from '@/constant/roles';
import { type UserProfile } from '@/types/common';

export interface MockUser {
  username: string;
  password: string;
  token: string;
  profile: UserProfile;
}

export const MOCK_USERS: MockUser[] = [
  {
    username: 'admin',
    password: 'admin',
    token: 'mock-token-admin',
    profile: {
      id: '1',
      username: 'admin',
      fullName: 'مدیر سامانه',
      branch: 'شعبه مرکزی',
      roles: [ROLES.ADMIN],
    },
  },
  {
    username: 'branch',
    password: 'branch',
    token: 'mock-token-branch',
    profile: {
      id: '2',
      username: 'branch',
      fullName: 'کاربر شعبه',
      branch: 'شعبه ونک',
      roles: [ROLES.BRANCH],
    },
  },
];
