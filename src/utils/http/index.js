// import * as Vue from 'vue';
// import Request from '@quantum-asia/uni-request';
import { noToken, checkToken, getToken } from '@/utils/auth';
import { showLoading, hideLoading } from '@/utils/loading';

const baseConfig = {
  checkToken: true,
  fail: false,
  loading: {
    title: '加载中...',
    show: true,
  },
};

export default class Service {
  constructor() {
    // this.app = new Vue();
    // console.log('app: ', app);
    // this.http = new Request();

    this.http.interceptors.request.use(
      config => {
        if (config.formData) {
          config.data = this.paramsSerializer(config.data);
          config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          };
        }

        if (config.checkToken) {
          checkToken().then(() => {
            config.headers.Authorization = `bearer ${getToken()}`;
          });
        }

        return Promise.resolve(config);
      },
      error => Promise.reject(error),
    );

    this.http.interceptors.response.use(
      response => {
        const { data } = response;
        if (data.resultCode === 2) {
          noToken();
        }
        return Promise.resolve(data);
      },
      error => {
        const code = parseInt(error.statusCode, 10);
        const codeEnums = {
          400: '发出的请求有错误',
          401: '登录失效，请重新登录',
          403: '服务器拒绝本次访问',
          404: '请求资源未找到',
          406: '请求的格式不正确',
          405: '请求方式不正确',
          499: '登录失效，请重新登录',
          500: '内部服务器错误',
          501: '服务器不支持该请求中使用的方法',
          502: '网关错误',
          503: '服务不可用',
          504: '网关超时',
        };

        if (code === 401) {
          noToken();
        } else {
          uni.showModal({
            title: '提示',
            content: codeEnums[code] ?? '服务器异常',
            showCancel: false,
          });
        }
        return Promise.reject(error);
      },
    );
  }

  paramsSerializer(params) {
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

    const result = parts.join('&');
    return result;
  }

  request(type, url, params = {}, config = {}) {
    if (config.loading?.show) {
      showLoading(config.loading.title);
    }

    return new Promise((resolve, reject) => {
      this.http[type](
        url,
        type === 'get' ? { params, ...config } : params,
        type === 'post' ? config : null,
      )
        .then(res => {
          console.log('🚀 ~ file: index.js ~ line 112 ~ Service ~ returnnewPromise ~ res', res);
          if (res.success) {
            resolve(res);
          } else {
            if (config.fail) {
              reject(res);
            }
          }
        })
        .catch(err => {
          if (config.fail) {
            reject(err);
          }
        })
        .finally(() => {
          if (config.loading?.show) {
            hideLoading();
          }
        });
    });
  }

  async get({ url = '', params = {}, config = {} }) {
    console.log('url: ', url);
    let errData = null;
    let resData = null;

    await this.request('get', url, params, { ...baseConfig, ...config })
      .then(res => {
        console.log('res: ', res);
        resData = res;
      })
      .catch(err => {
        errData = err;
      });

    return [errData, resData];
  }

  async post({ url = '', params = {}, config = {} }) {
    let errData = null;
    let resData = null;

    await this.request('post', url, params, { ...baseConfig, ...config })
      .then(res => {
        resData = res;
      })
      .catch(err => {
        errData = err;
      });

    return [errData, resData];
  }
}
