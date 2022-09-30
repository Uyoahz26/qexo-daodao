import Axios from 'axios';
import { useCommonStore } from '@/store/modules/common';
import { noToken, checkToken, getToken } from '@/utils/auth';

const commonStore = useCommonStore();
const axiosInstance = Axios.create({
  timeout: 10,
  baseURL: commonStore.baseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
  },
  paramsSerializer,
});

axiosInstance.interceptors.request.use(
  config => {
    if (config.checkToken) {
      checkToken().then(() => {
        switch (config.method) {
          case 'post':
            config.data.token = getToken();
            break;
          case 'get':
            config.params.token = getToken();
            break;
        }
      });
    }
    return Promise.resolve(config);
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => {
    const { data } = response;
    const keyword = '鉴权失败';

    data.msg = data.msg ?? '';

    if (data === keyword || data.msg.includes(keyword)) {
      noToken();
    }

    return Promise.resolve(data);
  },
  error => {
    const code = parseInt(error.response.status, 10);
    const httpCode = {
      400: '发出的请求有错误',
      401: '登录失效，请重新登录',
      403: '服务器拒绝本次访问',
      404: '请求资源未找到',
      406: '请求的格式不正确',
      405: '请求方式不正确',
      500: '内部服务器错误',
      501: '服务器不支持该请求中使用的方法',
      502: '网关错误',
      503: '服务不可用',
      504: '网关超时',
    };

    if (code === 401) {
      noToken();
    }
    uni.showToast({
      title: httpCode[code] ?? '请求失败',
      duration: 2000,
    });
    return Promise.reject(error);
  },
);

export function paramsSerializer(params) {
  const parts = [];

  for (let key in params) {
    let val = params[key];

    if (val === null || Object.prototype.toString.call(val) === '[object Undefined]') {
      continue;
    }
    if (Array.isArray(val)) {
      val = JSON.stringify(val);
    }

    parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
  }
  return parts.join('&');
}

export { axiosInstance };
