import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { isAxiosError } from 'axios';
import { createElement } from 'react';
import { toast } from 'sonner';

import { QUERY_KEYS } from '@/constant/queryKeys';
import { toPersianDigits } from '@/utils/date';
import { formatRial } from '@/utils/number';

import { createLoanRequests } from '../api';
import { type CreateLoanRequestPayload, type DuplicateLoanError } from '../types';

const duplicateList = (duplicates: DuplicateLoanError['duplicates']) =>
  createElement(
    'ul',
    { className: 'm-0 ps-5 text-[13px] leading-8' },
    duplicates.map((item) =>
      createElement(
        'li',
        { key: item.staffName },
        `${item.staffName}: قبلاً ${formatRial(item.amount)} وام (${item.planTitle}) در این ماه تخصیص داده‌اید`,
      ),
    ),
  );

/**
 * ثبت درخواست وام.
 * اگر سرور ۴۰۹ (تخصیص تکراری در همین ماه) برگرداند، به‌جای توست پیش‌فرض
 * مودال تأیید نمایش داده می‌شود و با تأیید کاربر دوباره با confirmDuplicates ارسال می‌شود.
 */
export const useCreateLoanRequest = (companyId: string, onCreated: () => void) => {
  const queryClient = useQueryClient();
  const { modal } = App.useApp();

  const mutation = useMutation({
    mutationFn: (payload: CreateLoanRequestPayload) =>
      createLoanRequests(companyId, payload, { onError: { 409: () => undefined } }),
    onSuccess: ({ created }) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CREDIT.ALL });
      onCreated();
      toast.success(`درخواست وام برای ${toPersianDigits(created)} نفر با موفقیت ثبت شد.`);
    },
    onError: (error, payload) => {
      if (!isAxiosError<DuplicateLoanError>(error) || error.response?.status !== 409) return;
      modal.confirm({
        title: 'هشدار تخصیص مجدد در همین ماه',
        width: 520,
        content: duplicateList(error.response.data.duplicates),
        okText: 'تخصیص مجدد',
        cancelText: 'انصراف',
        onOk: () => mutation.mutate({ ...payload, confirmDuplicates: true }),
      });
    },
  });

  return mutation;
};
