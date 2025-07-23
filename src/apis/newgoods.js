import httpInstance from "@/utils/http";
export function getNewGoodsAPI() {
  return httpInstance.get("/home/new");
}
