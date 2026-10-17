import { type Staff } from '@/features/staff/types';

export interface MockStaff extends Staff {
  companyId: string;
}

export const MOCK_STAFF: MockStaff[] = [
  {
    id: 's-1',
    companyId: 'c-1',
    fullName: 'علی محمدی',
    nationalId: '0012345678',
    mobile: '09121234567',
    personnelCode: '101',
    hireDate: '2024-05-04',
    priority: 1,
  },
  {
    id: 's-2',
    companyId: 'c-1',
    fullName: 'زهرا احمدی',
    nationalId: '0023456789',
    mobile: '09122345678',
    personnelCode: '102',
    hireDate: '2023-09-23',
    priority: 2,
  },
  {
    id: 's-3',
    companyId: 'c-1',
    fullName: 'محمد رضایی',
    nationalId: '0034567890',
    mobile: '09123456789',
    personnelCode: '103',
    hireDate: '2025-01-15',
    priority: 3,
  },
  {
    id: 's-4',
    companyId: 'c-2',
    fullName: 'مریم کریمی',
    nationalId: '0045678901',
    mobile: '09124567890',
    personnelCode: '201',
    hireDate: '2022-11-01',
    priority: 1,
  },
];
