import httpInstance from "@/utils/http";

export function getHotProdAPI() {
  return httpInstance.get("/home/hot");
}
export function getNewGoodsAPI() {
  return httpInstance.get("/home/new");
}
export function getBannerAPI(params = {}) {
  const { distributionSite = "1" } = params; // 默认值为1
  return httpInstance.get("/home/banner", {
    params: {
      distributionSite,
    },
  });
}
export function getProductAPI() {
  return httpInstance.get("/home/goods");
}
