export interface MockManagedUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  userCode: string;
  branchName: string;
  branchCode: string;
}

/** کاربران قابل مدیریت در صفحه «مدیریت کاربران» */
export const MOCK_MANAGED_USERS: MockManagedUser[] = [
  {
    id: 'u-1',
    username: 'admin',
    password: 'admin',
    fullName: 'مدیر سامانه',
    userCode: '001',
    branchName: 'ستاد مرکزی',
    branchCode: '150000',
  },
  {
    id: 'u-2',
    username: 'branch',
    password: 'branch',
    fullName: 'کاربر شعبه',
    userCode: '399',
    branchName: 'شعبه ونک',
    branchCode: '150002',
  },
];
