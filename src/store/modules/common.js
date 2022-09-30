import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      baseUrl: '',
      token: '',
    };
  },
  persist: {
    key: 'qexo-daodao',
    storage: {
      getItem: key => uni.getStorageSync(key),
      setItem: (key, value) => uni.setStorageSync(key, value),
      removeItem: key => uni.removeStorageSync(key),
    },
    overwrite: true,
  },
});
