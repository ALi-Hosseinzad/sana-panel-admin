export interface Staff {
  id: string;
  fullName: string;
  nationalId: string;
  mobile: string;
  personnelCode: string;
  /** تاریخ استخدام (میلادی YYYY-MM-DD) */
  hireDate: string;
  /** اولویت تخصیص (عدد کوچک‌تر = اولویت بالاتر) */
  priority: number;
}

export type StaffPayload = Omit<Staff, 'id'>;

/** فیلترهای جستجوی پرسنل (از کوئری آدرس) */
export interface StaffFilters {
  q?: string;
  hireFrom?: string;
  hireTo?: string;
}

export interface StaffImportResult {
  added: number;
}
