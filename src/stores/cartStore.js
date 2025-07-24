import { ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
    const addCart = (goods) => {
      // 添加过count++ else push
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        item.count += goods.count;
      } else {
        cartList.value.push(goods);
      }
    };
    return { cartList, addCart };
  },
  {
    persist: true,
  },
);
