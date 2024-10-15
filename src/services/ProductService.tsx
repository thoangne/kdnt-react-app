import axios from "./CustomizeAxios";
import {FilerObject} from '../initialize/type';
export const fetchAllProduct = () => {
  return axios.get("/products");
}

export const fetchAllProductFilter = (filterObject: FilerObject) => {
    return axios.get(`/products/filter${filterObject}`);
}

export const searchProduct = (keyword:string) => {
    return axios.get(`/products/search${keyword}`);
}

export const fetchProductById = async (productId: string) => {
  try {
      const response = await axios.get(`/products/${productId}`);
      return response.data;
  } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      throw error;
  }
};


export const deleteProductById = (productId: string) => {
  return axios.get(`/products${productId}`);
}
