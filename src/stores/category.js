import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layout";
import { throttle } from "@/utils/throttle";
export const useCategoryStore = defineStore("category", () => {
  const categoryList = ref([]);
  const getCategoryOld = async () => {
    const res = await getCategoryAPI();
    categoryList.value = res.result;
  };
  const getCategory = throttle(getCategoryOld, 500);
  return { categoryList, getCategory };
});
