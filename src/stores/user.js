import { ref } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "@/stores/cartStore";

export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();
    const userInfo = ref({});

    const getUserInfo = async ({ account, password }) => {
      // 登录时调用
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
      // 登录时调用
      await cartStore.updateCart();
    };

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
