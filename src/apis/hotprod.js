import httpInstance from "@/utils/http";
export function getHotProdAPI() {
  return httpInstance.get("/home/hot");
}
