import { create } from 'zustand';

import { type UserProfile } from '@/types/common';

interface ProfileState {
  profile: UserProfile | null;
  roles: string[];
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  /** آیا کاربر حداقل یکی از نقش‌های داده‌شده را دارد؟ (بدون ورودی = همیشه true) */
  hasRole: (required?: string | string[]) => boolean;
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  profile: null,
  roles: [],
  setProfile: (profile) => set({ profile, roles: profile.roles }),
  clearProfile: () => set({ profile: null, roles: [] }),
  hasRole: (required) => {
    if (!required || (Array.isArray(required) && required.length === 0)) return true;
    const list = Array.isArray(required) ? required : [required];
    const { roles } = get();
    return list.some((role) => roles.includes(role));
  },
}));
