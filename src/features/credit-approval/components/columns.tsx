import { CheckOutlined, CloseOutlined, PaperClipOutlined } from '@ant-design/icons';
import { type ColumnsType } from 'antd/es/table';

import { Button } from '@/component/button';
import { StatusChip } from '@/component/status-chip';
import { LOAN_STATUS } from '@/constant/loanStatus';
import { type DecisionType } from '@/features/manager-approval/types';
import { formatJalali } from '@/utils/date';
import { formatRial } from '@/utils/number';

import { type CreditApprovalItem } from '../types';

const toJalali = (value: string | null) =>
  value ? formatJalali(value, undefined, { persianDigits: true }) : '—';

export const buildColumns = (
  onDecide: (type: DecisionType, row: CreditApprovalItem) => void,
): ColumnsType<CreditApprovalItem> => [
  { title: 'شرکت', dataIndex: 'companyName' },
  { title: 'پرسنل', dataIndex: 'staffName' },
  { title: 'طرح', dataIndex: 'planTitle' },
  { title: 'مبلغ', dataIndex: 'amount', render: formatRial },
  { title: 'تاریخ ثبت', dataIndex: 'createdAt', render: toJalali },
  { title: 'تاریخ تأیید/رد', dataIndex: 'decidedAt', render: toJalali },
  { title: 'توضیحات', dataIndex: 'note', render: (value?: string) => value ?? '—' },
  {
    title: 'مستندات',
    dataIndex: 'file',
    render: (file?: CreditApprovalItem['file']) =>
      file ? (
        <span className="inline-flex items-center gap-1 text-xs">
          <PaperClipOutlined />
          {file.name}
        </span>
      ) : (
        '—'
      ),
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    render: (status: CreditApprovalItem['status']) => (
      <StatusChip tone={LOAN_STATUS[status].tone}>{LOAN_STATUS[status].title}</StatusChip>
    ),
  },
  {
    title: 'عملیات',
    key: 'actions',
    render: (_value, row) =>
      row.status === 'pending_credit' ? (
        <div className="flex gap-1.5">
          <Button size="small" icon={<CheckOutlined />} onClick={() => onDecide('approve', row)}>
            تأیید
          </Button>
          <Button
            variant="danger"
            size="small"
            icon={<CloseOutlined />}
            onClick={() => onDecide('reject', row)}
          >
            رد
          </Button>
        </div>
      ) : (
        '—'
      ),
  },
];
