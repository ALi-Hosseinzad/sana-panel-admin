import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider, useLocation } from 'react-router';

import { TextInput } from '../input';

import { Form } from './Form';
import { FormItem } from './FormItem';

const LocationProbe = () => <output data-testid="search">{useLocation().search}</output>;

const renderSearchForm = (
  props: { onSearch?: (values: object) => void } = {},
  initial = '/list',
) => {
  const router = createMemoryRouter(
    [
      {
        path: '/list',
        element: (
          <>
            <Form layout="inline" {...props}>
              <FormItem name="name" label="نام">
                <TextInput />
              </FormItem>
            </Form>
            <LocationProbe />
          </>
        ),
      },
    ],
    { initialEntries: [initial] },
  );
  render(<RouterProvider router={router} />);
  return router;
};

describe('Form (inline / search)', () => {
  it('adds values to query params and the reset button removes only its own keys', async () => {
    const user = userEvent.setup();
    const router = renderSearchForm({}, '/list?tab=2');

    await user.type(screen.getByLabelText('نام'), 'علی');
    await user.click(screen.getByRole('button', { name: /^search جستجو$|^جستجو$/ }));
    await waitFor(() => expect(router.state.location.search).toContain('name='));
    expect(router.state.location.search).toContain('tab=2');
    expect(router.state.location.pathname).toBe('/list');

    await user.click(screen.getByRole('button', { name: /حذف جستجو/ }));
    await waitFor(() => expect(router.state.location.search).toBe('?tab=2'));
    expect(screen.getByLabelText('نام')).toHaveValue('');
  });

  it('calls the custom onSearch instead of touching the URL', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const router = renderSearchForm({ onSearch });

    await user.type(screen.getByLabelText('نام'), 'رضا');
    await user.click(screen.getByRole('button', { name: /^search جستجو$|^جستجو$/ }));
    await waitFor(() => expect(onSearch).toHaveBeenCalledWith({ name: 'رضا' }));
    expect(router.state.location.search).toBe('');
  });

  it('fills fields from the query string', async () => {
    renderSearchForm({}, '/list?name=%D8%B3%D8%A7%D8%B1%D8%A7');
    await waitFor(() => expect(screen.getByLabelText('نام')).toHaveValue('سارا'));
  });
});
