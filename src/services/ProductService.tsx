import axios from "./CustomizeAxios";
import {FilterObject} from '../initialize/type';
export const fetchAllProduct = async() => {
  try{
    const res = await axios.get("/products");
    return res.data;
  }catch(error){
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    throw error;
  }
}



export const fetchProductFilter = async (filterObject: FilterObject) => {
  try {
    const res = await axios.post(`http://localhost:8081/products/filter`, filterObject, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (error) {
    console.error("Lỗi khi filter sản phẩm:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};


export const fetchProductsByCategoryId = async (categoryid: string ) => {
  try {
    const res = await axios.get(`/products/category`, {
      params: {
        categoryid: categoryid, // Pass the keyword as a query parameter
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Không tìm thấy ${categoryid}:`, error);
    throw error;
  }
};

export const searchProduct = async (keyword: string | null) => {
  try {
    const res = await axios.get(`/products/search`, {
      params: {
        keyword: keyword, // Pass the keyword as a query parameter
      },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    throw error;
  }
};
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
