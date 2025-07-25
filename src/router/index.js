import { createRouter, createWebHistory } from "vue-router";
// createRouter 创建路由实例
// createWebHistory 创建历史记录
// routes 路由配置
// Nprogress 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import NotFound from "@/views/NotFound/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Detail from "@/views/Detail/index.vue";
import About from "@/views/About/index.vue";
import Help from "@/views/Help/index.vue";
import CartList from "@/views/CartList/index.vue";
import Checkout from "@/views/Checkout/index.vue";
NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
  minimum: 0.2,
  trickleSpeed: 200,
  parent: "body",
});

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
        {
          path: "detail/:id",
          component: Detail,
        },
        {
          path: "about",
          component: About,
        },
        {
          path: "help",
          component: Help,
        },
        {
          path: "cartlist",
          component: CartList,
        },
        {
          path: "checkout",
          component: Checkout,
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

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});
router.onError(() => {
  NProgress.done();
});
export default router;
