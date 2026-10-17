import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Table } from './Table';

interface Row {
  id: number;
  name: string;
}

const rows: Row[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `نفر ${index + 1}`,
}));
const columns = [{ title: 'نام', dataIndex: 'name', key: 'name' }];

describe('Table', () => {
  it('has pagination disabled by default', () => {
    render(<Table<Row> columns={columns} dataSource={rows} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.getByText('نفر 25')).toBeInTheDocument();
  });

  it('paginates client-side and shows the total count', async () => {
    const user = userEvent.setup();
    render(<Table<Row> columns={columns} dataSource={rows} pagination showRowNumber />);

    expect(screen.getByText('نفر 10')).toBeInTheDocument();
    expect(screen.queryByText('نفر 11')).not.toBeInTheDocument();
    expect(screen.getByText('۲۵')).toBeInTheDocument();

    await user.click(within(screen.getByRole('list')).getByText('2'));
    expect(screen.getByText('نفر 11')).toBeInTheDocument();
    expect(screen.getByText('۱۱')).toBeInTheDocument();
  });

  it('delegates page changes when server-side', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Table<Row>
        columns={columns}
        dataSource={rows.slice(0, 10)}
        pagination={{ current: 1, pageSize: 10, total: 25, onChange, showTotal: false }}
      />,
    );
    await user.click(within(screen.getByRole('list')).getByText('3'));
    expect(onChange).toHaveBeenCalledWith(3, 10);
    expect(screen.queryByText(/تعداد کل/)).not.toBeInTheDocument();
  });
});
