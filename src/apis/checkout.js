// 购物车接口
import request from "@/utils/http";

export const getCheckoutDetailAPI = () => {
  return request({
    url: "/member/order/pre",
  });
};
