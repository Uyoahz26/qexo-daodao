import { axiosInstance } from './service';
import { useCommonStore } from '@/store/modules/common';
import { showLoading, hideLoading } from '../loading/index';

const commonStore = useCommonStore();
const baseConfig = {
  checkToken: true,
  isFail: false,
  loading: {
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    show: true,
    duration: 0,
  },
};

function request(type, url, params, config) {
  config.loading?.show && showLoading();

  return new Promise((resolve, reject) => {
    type = type.toLowerCase();
    axiosInstance[type](
      url,
      type === 'get' ? { params, ...config } : params,
      type === 'post' ? config : null,
    )
      .then(res => {
        if (res.status) {
          resolve(res.data);
        } else {
          reject(res.Data);
        }
      })
      .catch(err => {
        if (config.isFail) {
          reject(err);
        }
      })
      .finally(() => {
        hideLoading();
      });
  });
}

export async function get({ url = '', params = {}, config = {} }) {
  let errData = null;
  let resData = null;

  await request('get', `${commonStore.baseUrl}${url}`, params, { ...baseConfig, ...config })
    .then(res => {
      resData = res;
    })
    .catch(err => {
      errData = err;
    });

  return [errData, resData];
}

export async function post({ url = '', params = {}, config = {} }) {
  let errData = null;
  let resData = null;
  params.data.token = commonStore.token;
  await request('post', `${commonStore.baseUrl}${url}`, params, { ...baseConfig, ...config })
    .then(res => {
      resData = res;
    })
    .catch(err => {
      errData = err;
    });

  return [errData, resData];
}
