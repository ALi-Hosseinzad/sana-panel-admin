import { env } from '@/config/env';

export const api = (path: string) => `${env.apiBaseUrl}${path}`;
