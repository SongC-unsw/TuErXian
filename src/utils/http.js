import axios from "axios";
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";
// 创建实例
const httpInstance = axios.create({
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000, // timeout 5s
});

// 请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
// 统一的错误处理和提示
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });
    return Promise.reject(e);
  },
);
// 导出实例
export default httpInstance;
