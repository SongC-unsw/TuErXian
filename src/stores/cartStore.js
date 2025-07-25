import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";
import { addCartAPI, getCartListAPI, selectCartAPI, deleteCartAPI, modCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo?.token);

    // 清空购物车
    const updateCart = async () => {
      const res = await getCartListAPI();
      cartList.value = res.result;
    };
    const clearCart = async () => {
      // 如果没有登录
      if (!isLogin.value) {
        cartList.value = [];
      } else {
        // 登录的逻辑
        await deleteCartAPI({ ids: cartList.value.map((item) => item.skuId) });
        updateCart();
      }
    };

    // 添加购物车
    const addCart = async (goods) => {
      // 判断是否登录
      if (isLogin.value) {
        // 登录的逻辑
        await addCartAPI({ skuId: goods.skuId, count: goods.count });
        updateCart();
      } else {
        // 未登录的本地逻辑
        // 添加过count++ else push
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          item.count += goods.count;
        } else {
          cartList.value.push(goods);
        }
      }
    };

    const delCart = async (skuId) => {
      const index = cartList.value.findIndex((item) => item.skuId === skuId);
      cartList.value.splice(index, 1);
      // optimization delete first fetch later
      if (isLogin.value) {
        await deleteCartAPI({ ids: [skuId] });
        updateCart();
      }
    };

    const updateSelected = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      if (item) {
        item.selected = selected;
      }
    };

    const isAllSelected = computed(() => {
      return cartList.value.every((item) => item.selected);
    });

    const toggleAllSelected = (selected) => {
      cartList.value.forEach((item) => {
        item.selected = selected;
      });
    };
    return {
      cartList,
      addCart,
      delCart,
      updateSelected,
      isAllSelected,
      toggleAllSelected,
      clearCart,
    };
  },
  {
    persist: true,
  },
);
