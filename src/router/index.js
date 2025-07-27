import { createRouter, createWebHistory } from "vue-router";
// createRouter 创建路由实例
// createWebHistory 创建历史记录
// routes 路由配置
// Nprogress 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
// import Category from "@/views/Category/index.vue";
// import NotFound from "@/views/NotFound/index.vue";
// import SubCategory from "@/views/SubCategory/index.vue";
// import Detail from "@/views/Detail/index.vue";
// import About from "@/views/About/index.vue";
// import Help from "@/views/Help/index.vue";
// import CartList from "@/views/CartList/index.vue";
// import Checkout from "@/views/Checkout/index.vue";
// import Pay from "@/views/Pay/index.vue";
// import PayCallback from "@/views/Pay/payback.vue";
// import Member from "@/views/Member/index.vue";
// import UserInfo from "@/views/Member/components/UserInfo.vue";
// import UserOrder from "@/views/Member/components/UserOrder.vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
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
          component: () => import("@/views/Category/index.vue"),
        },
        {
          path: "category/sub/:id",
          component: () => import("@/views/SubCategory/index.vue"),
        },
        {
          path: "detail/:id",
          component: () => import("@/views/Detail/index.vue"),
        },
        {
          path: "about",
          component: () => import("@/views/About/index.vue"),
        },
        {
          path: "help",
          component: () => import("@/views/Help/index.vue"),
        },
        {
          path: "cartlist",
          component: () => import("@/views/CartList/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "checkout",
          component: () => import("@/views/Checkout/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "pay",
          component: () => import("@/views/Pay/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "paycallback",
          component: () => import("@/views/Pay/payback.vue"),
        },
        {
          path: "member",
          component: () => import("@/views/Member/index.vue"),
          meta: { requiresAuth: true },
          children: [
            {
              path: "user",
              component: () => import("@/views/Member/components/UserInfo.vue"),
              meta: { requiresAuth: true },
            },
            {
              path: "order",
              component: () => import("@/views/Member/components/UserOrder.vue"),
              meta: { requiresAuth: true },
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound/index.vue"),
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

  const userStore = useUserStore();
  const isLoggedIn = !!userStore.userInfo?.token;

  // 检查当前路由及其父路由是否需要登录
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn) {
    ElMessage.warning("请先登录");
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
    return;
  }
  if (to.path === "/login" && isLoggedIn) {
    next("/");
    return;
  }

  next();
});
router.afterEach(() => {
  NProgress.done();
});
router.onError(() => {
  NProgress.done();
});
export default router;
