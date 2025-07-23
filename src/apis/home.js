import httpInstance from "@/utils/http";

export function getHotProdAPI() {
  return httpInstance.get("/home/hot");
}
export function getNewGoodsAPI() {
  return httpInstance.get("/home/new");
}
export function getBannerAPI() {
  return httpInstance.get("/home/banner");
}
