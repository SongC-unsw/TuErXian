import request from "@/utils/http";
export function getCategoryAPI(id) {
  return request({
    url: "/category",
    method: "GET",
    params: {
      id: id,
    },
  });
}
