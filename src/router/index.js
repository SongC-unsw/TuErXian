import { createRouter, createWebHistory } from "vue-router";
// createRouter 创建路由实例
// createWebHistory 创建历史记录
// routes 路由配置
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import NotFound from "@/views/NotFound/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: Home,
        },
        {
          path: "category/:id",
          component: Category,
        },
        {
          path: "category/sub/:id",
          component: SubCategory,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth", // 平滑滚动更高级
    };
  },
});

export default router;
