// 封装 Category相关代码
import { ref, onMounted } from "vue";
import { getCategoryAPI } from "@/apis/category";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

export function useCategory() {
  const route = useRoute();
  const categoryList = ref({});
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id);
    categoryList.value = res.result;
  };
  onMounted(() => getCategory());
  onBeforeRouteUpdate((to, from) => {
    //变化之后的路由参数
    getCategory(to.params.id);
  });

  return {
    categoryList,
  };
}
