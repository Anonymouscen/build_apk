import axios from 'axios'

const request = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 8000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  },
})

request.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
});

request.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '登录状态异常';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求资源不存在';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          error.message = `连接出错!`
      }
    }
    console.log(error.message);
    return Promise.reject(error.message)
  }
);

export default request
