import { ref, computed } from "vue";
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
    const delCart = (skuId) => {
      const index = cartList.value.findIndex((item) => item.skuId === skuId);
      cartList.value.splice(index, 1);
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
