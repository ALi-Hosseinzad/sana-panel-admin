export const mobileNumberRule = {
  pattern: /^09\d{9}$/,
  message: 'شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود.',
};

export const nationalCodeRule = {
  pattern: /^\d{10}$/,
  message: 'کد ملی باید ۱۰ رقم باشد.',
};
