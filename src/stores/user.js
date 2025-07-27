import { ref } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "@/stores/cartStore";
import { throttle } from "@/utils/throttle";

export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();
    const userInfo = ref({});

    const getUserInfoOld = async ({ account, password }) => {
      // 登录时调用
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
      // 登录时调用

      await cartStore.mergeCart();
    };
    const getUserInfo = throttle(getUserInfoOld, 500);
    const clearUserInfo = () => {
      userInfo.value = {};
      cartStore.clearCart(true);
    };
    return { userInfo, getUserInfo, clearUserInfo };
  },
  {
    persist: true,
  },
);
