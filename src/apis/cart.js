// 购物车接口
import request from "@/utils/http";
// add
export const addCartAPI = ({ skuId, count }) => {
  return request({
    url: "/member/cart",
    method: "POST",
    data: {
      skuId,
      count,
    },
  });
};

// delete
export const deleteCartAPI = ({ ids }) => {
  return request({
    url: "/member/cart",
    method: "DELETE",
    data: {
      ids,
    },
  });
};
// get

export const getCartListAPI = () => {
  return request({
    url: "/member/cart",
  });
};

// select

export const selectCartAPI = ({ ids, selected }) => {
  return request({
    url: "/member/cart/selected",
    method: "PUT",
    data: {
      selected,
      ids,
    },
  });
};

// mod
export const modCartAPI = ({ selected, count }) => {
  return request({
    url: "/member/cart/{id}",
    method: "PUT",
    data: {
      selected,
      count,
    },
  });
};
