import axios from "./CustomizeAxios";
import {FilerObject} from '../initialize/type';
export const fetchAllProduct = async() => {
  try{
    const res = await axios.get("/products");
    return res.data;
  }catch(error){
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    throw error;
  }
}

export const fetchAllProductFilter = (filterObject: FilerObject) => {
    return axios.get(`/products/filter${filterObject}`);
}

export const searchProduct = async(keyword:string | null) => {
  try{
    const res = await axios.get(`/products/search${keyword}`);
    return res.data;
  }catch(error){
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      throw error;
  }
    
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
