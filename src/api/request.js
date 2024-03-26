import axios from "axios";
import message from 'element-plus'
import { tansParams } from "/src/api/ruijie";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";


// if (!('process' in window)) {
//   window.process = {
//       env: {
//           DEBUG: undefined
//       }
//   }
// }

// 创建axios实例
const service = axios.create({
  
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL:'http://localhost:8080',
  // 超时
  timeout: 150000,
});


// request拦截器
service.interceptors.request.use(
  (config) => {
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
