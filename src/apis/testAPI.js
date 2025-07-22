import httpInstance from "@/utils/http";

const getCategory = () => {
  return httpInstance.get("/home/category/head");
};
export { getCategory };
