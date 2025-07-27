import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";
import { throttle } from "@/utils/throttle";
import { addCartAPI, getCartListAPI, deleteCartAPI, mergeCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo?.token);
    const filteredCartList = computed(() => {
      return cartList.value.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));
    });
    //合并购物车
    const mergeCart = async () => {
      const newList = filteredCartList.value;
      await mergeCartAPI({ cartList: newList });
      updateCart();
    };

    // 清空购物车
    const updateCart = async () => {
      const res = await getCartListAPI();
      cartList.value = res.result;
    };
    const clearCart = async (logout = false) => {
      // 如果没有登录
      if (!isLogin.value || logout) {
        cartList.value = [];
      } else {
        // 登录的逻辑
        await deleteCartAPI({ ids: cartList.value.map((item) => item.skuId) });
        updateCart();
      }
    };

    // 添加购物车
    const addCartOld = async (goods) => {
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
    const addCart = throttle(addCartOld, 500);

    const delCartOld = async (skuId) => {
      const index = cartList.value.findIndex((item) => item.skuId === skuId);
      cartList.value.splice(index, 1);
      // optimization delete first fetch later
      if (isLogin.value) {
        await deleteCartAPI({ ids: [skuId] });
        updateCart();
      }
    };
    const delCart = throttle(delCartOld, 300);

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
      updateCart,
      mergeCart,
    };
  },
  {
    persist: true,
  },
);
