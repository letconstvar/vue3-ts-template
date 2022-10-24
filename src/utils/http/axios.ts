import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';
import httpStatusCodeHandler from './httpStatusCodeHandler';

const instance: AxiosInstance = axios.create({
  baseURL: '/proxy',
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config): AxiosRequestConfig => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        'Authorization'
      )}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (res): AxiosResponse => {
    if (res.data.errorCode !== 10200) {
      message.error(res.data.errorMsg);
    }
    return res;
  },
  (err): AxiosResponse => {
    // handleResponseStatus(err.response.status);
    httpStatusCodeHandler.sendMessage(err.response.status, message);
    return err;
  }
);

/*
function handleResponseStatus(status: number) {
  const tipsMap = new Map([
    [400, '参数错误，请确认参数是否提交完整'],
    [401, '登陆超时，请重新登陆'],
    [403, '无权限'],
    [404, '资源不存在'],
    [500, '服务错误'],
  ]);
  const tip = tipsMap.get(status) || '请求失败';
  message.error(tip);

  if (status === 401) {
    location.href = '/';
  }
}
*/

export default instance;
