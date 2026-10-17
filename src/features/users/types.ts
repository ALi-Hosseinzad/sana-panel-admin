/** کاربر سامانه (رمز عبور هیچ‌وقت از سرور برگردانده نمی‌شود) */
export interface User {
  id: string;
  username: string;
  fullName: string;
  userCode: string;
  branchName: string;
  branchCode: string;
}

/** بدنه ثبت/ویرایش؛ در ویرایش، رمز خالی یعنی رمز قبلی تغییر نکند */
export interface UserPayload extends Omit<User, 'id'> {
  password?: string;
}
