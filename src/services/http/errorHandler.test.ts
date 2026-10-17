import { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

import { useAuthStore } from '@/store/useAuthStore';

import { handleHttpError } from './errorHandler';
import { type ErrorHandlerMap, type HttpError } from './types';

vi.mock('sonner', () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

const makeError = (status: number | null, config: Partial<InternalAxiosRequestConfig> = {}) => {
  const requestConfig = { headers: new AxiosHeaders(), ...config } as InternalAxiosRequestConfig;
  const response = status
    ? { status, statusText: '', data: {}, headers: {}, config: requestConfig }
    : undefined;
  return new AxiosError('failed', 'ERR', requestConfig, null, response) as HttpError;
};

describe('handleHttpError', () => {
  beforeEach(() => vi.clearAllMocks());

  it('runs the custom handler for the matching status instead of the default', () => {
    const on404 = vi.fn();
    handleHttpError(makeError(404, { onError: { 404: on404 } satisfies ErrorHandlerMap }));
    expect(on404).toHaveBeenCalledOnce();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('falls back to the default behaviour when no custom handler exists for the status', () => {
    const on404 = vi.fn();
    handleHttpError(makeError(500, { onError: { 404: on404 } }));
    expect(on404).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('خطای داخلی سرور رخ داده است.');
  });

  it('logs out on 401 by default', () => {
    useAuthStore.setState({ token: 'abc' });
    handleHttpError(makeError(401));
    expect(useAuthStore.getState().token).toBeNull();
  });

  it('uses the network handler when there is no response', () => {
    const onNetwork = vi.fn();
    handleHttpError(makeError(null, { onError: { network: onNetwork } }));
    expect(onNetwork).toHaveBeenCalledOnce();
  });

  it('does nothing by default when silent is set', () => {
    handleHttpError(makeError(500, { silent: true }));
    expect(toast.error).not.toHaveBeenCalled();
  });
});
