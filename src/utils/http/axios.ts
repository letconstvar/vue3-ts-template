import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';

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
    handleResponseStatus(err.response.status);
    return err;
  }
);

function handleResponseStatus(status: number) {
  let text = '';
  switch (status) {
    case 400:
      text = '参数错误，请确认参数是否提交完整';
      break;
    case 401:
      text = '登陆超时，请重新登陆';
      window.location.href = '/';
      break;
    case 403:
      text = '无权限';
      break;
    case 404:
      text = '资源不存在';
      break;
    case 500:
      text = '服务错误';
      break;
    default:
      text = '请求失败';
  }
  message.error(text);
}

export default instance;
