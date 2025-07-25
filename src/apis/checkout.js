// 购物车接口
import request from "@/utils/http";

export const getCheckoutDetailAPI = () => {
  return request({
    url: "/member/order/pre",
  });
};
//创建订单
export const createOrderAPI = (data) => {
  return request({
    url: "/member/order",
    method: "POST",
    data,
  });
};
export const addAddressAPI = (data) => {
  return request({
    url: "/member/address",
    method: "POST",
    data,
  });
};
