import http from '@/utils/http';
import { PostLoginParams } from './types';

enum API {
  Login = '/api/v1/login',
}

export const postLoginApi = async (data: PostLoginParams) => {
  const { data: results } = await http.post<string>(API.Login, data);
  return results;
};
