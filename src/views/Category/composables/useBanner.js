// 封装 Banner相关代码
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";
export function useBanner() {
  const bannerList = ref([]);

  onMounted(async () => {
    const res = await getBannerAPI({ distributionSite: "2" });
    bannerList.value = res.result;
  });

  return {
    bannerList,
  };
}
