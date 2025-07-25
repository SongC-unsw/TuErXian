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
    const addCart = async (goods) => {
      // 判断是否登录
      if (isLogin.value) {
        // 登录的逻辑
        await addCartAPI({ skuId: goods.skuId, count: goods.count });
        const res = await getCartListAPI();
        cartList.value = res.result;
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
      if (isLogin.value) {
        await deleteCartAPI({ ids: [skuId] });
        const res = await getCartListAPI();
        cartList.value = res.result;
      } else {
        cartList.value.splice(index, 1);
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
    return { cartList, addCart, delCart, updateSelected, isAllSelected, toggleAllSelected };
  },
  {
    persist: true,
  },
);
