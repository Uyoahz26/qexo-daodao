import { useCommonStore } from '@/store/modules/common';

export const noToken = async () => {
  useCommonStore().$reset();
  uni.redirectTo({
    url: '/pages/login/index',
  });
};

export const checkToken = () => {
  return new Promise((resolve, reject) => {
    if (!getToken()) {
      noToken();
      reject(new Error('登录失效，请重新登录'));
    } else {
      resolve();
    }
  });
};

export const getToken = () => {
  return useCommonStore().token;
};

export const setToken = token => {
  useCommonStore().$patch({
    token,
  });
};
