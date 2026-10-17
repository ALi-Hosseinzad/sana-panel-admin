import { ENDPOINTS } from '@/constant/endpoints';
import { http } from '@/services/http';

import { type BaseInfo } from './types';

export const getBaseInfo = () => http.get<BaseInfo>(ENDPOINTS.BASE_INFO);

export const updateBaseInfo = (body: BaseInfo) =>
  http.put<BaseInfo, BaseInfo>(ENDPOINTS.BASE_INFO, body);
