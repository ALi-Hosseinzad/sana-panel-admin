import { toPersianDigits } from '@/utils/date';
import { formatRial } from '@/utils/number';
import { rialToTomanWords } from '@/utils/numberToWords';

import { type LoanRequestFormValues, type LoanRequestItem } from './types';

const toAmount = (value?: string) => Number(value ?? 0) || 0;

/** مبلغ هر پرسنل انتخاب‌شده (حالت یکسان یا متفاوت) */
export const selectedAmounts = (values: LoanRequestFormValues, staffIds: string[]) =>
  staffIds.map((id) =>
    values.amountMode === 'variable'
      ? toAmount(values.rows?.[id]?.amount)
      : toAmount(values.fixedAmount),
  );

/** آیتم‌های درخواست مرتب‌شده بر اساس ترتیب پرداخت */
export const buildRequestItems = (
  values: LoanRequestFormValues,
  staffIds: string[],
): LoanRequestItem[] => {
  const amounts = selectedAmounts(values, staffIds);
  return staffIds
    .map((staffId, index) => ({
      staffId,
      amount: amounts[index] ?? 0,
      paymentOrder: values.rows?.[staffId]?.paymentOrder ?? index + 1,
    }))
    .sort((a, b) => a.paymentOrder - b.paymentOrder);
};

export interface SuggestionResult {
  text: string;
  isError: boolean;
}

/** متن راهنمای اعتبار قابل استفاده بر اساس مبالغ وارد شده (فقط نمایشی؛ بررسی نهایی سمت سرور است) */
export const buildSuggestion = (
  available: number,
  values: LoanRequestFormValues,
  staffIds: string[],
): SuggestionResult => {
  const count = staffIds.length;
  const amounts = selectedAmounts(values, staffIds);
  const total = amounts.reduce((sum, amount) => sum + amount, 0);
  const availableText = `اعتبار قابل استفاده این طرح در این ماه: ${formatRial(available)} (${rialToTomanWords(available)})`;

  if (values.amountMode === 'variable') {
    if (!count) return { text: availableText, isError: false };
    if (amounts.some((amount) => !amount)) {
      return { text: 'برای همه پرسنل انتخاب‌شده، مبلغ وام را در جدول وارد کنید.', isError: false };
    }
    if (total > available) {
      return {
        text: `مجموع مبالغ وارد‌شده (${formatRial(total)}) بیشتر از اعتبار باقی‌مانده این طرح (${formatRial(available)}) است.`,
        isError: true,
      };
    }
    return {
      text: `مجموع مبالغ ${toPersianDigits(count)} نفر: ${formatRial(total)} (${rialToTomanWords(total)}) — مجاز است.`,
      isError: false,
    };
  }

  const amount = toAmount(values.fixedAmount);
  if (!amount) return { text: availableText, isError: false };
  const maxCount = toPersianDigits(Math.floor(available / amount));
  if (!count) {
    return {
      text: `با این مبلغ برای هر نفر (${rialToTomanWords(amount)})، حداکثر می‌توانید به ${maxCount} نفر با این طرح وام بدهید. پرسنل را از جدول انتخاب کنید.`,
      isError: false,
    };
  }
  if (total > available) {
    return {
      text: `مجموع مبلغ برای ${toPersianDigits(count)} نفر (${formatRial(total)}) بیشتر از اعتبار باقی‌مانده این طرح است. حداکثر تعداد نفرات با این مبلغ: ${maxCount} نفر.`,
      isError: true,
    };
  }
  return {
    text: `مجموع مبلغ برای ${toPersianDigits(count)} نفر: ${formatRial(total)} (${rialToTomanWords(total)}) — مجاز است. با اعتبار باقی‌مانده حداکثر تا ${maxCount} نفر قابل پوشش است.`,
    isError: false,
  };
};
