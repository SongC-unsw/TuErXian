import axios from "axios";
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import router from "@/router";
// 创建实例
const httpInstance = axios.create({
  baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000, // timeout 5s
});

// 请求拦截器

httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e),
);

// 响应拦截器
// 统一的错误处理和提示
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    ElMessage({
      type: "warning",
      message: e.response?.data?.message || "错误",
    });
    // 401 未授权，清除数据，跳转到登录页
    if (e.response?.status === 401) {
      userStore.clearUserInfo();
      router.push("/login");
    }
    return Promise.reject(e);
  },
);
// 导出实例
export default httpInstance;
