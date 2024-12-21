import axios from "./CustomizeAxios";
import {FilterObject, Product, ProductRequest} from '../initialize/type';
import { openFailNotification, openSuccessNotification } from "../components/Notification";
import { checkToken } from "./TokenService";
export const fetchAllProduct = async() => {
  try{
    const res = await axios.get("/products");
    return res.data;
  }catch(error){
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    throw error;
  }
}

export const fetchProductsNotInPromotion = async() => {
  const token = await checkToken();
  
  try{
    const res = await axios.get("/products/p-product", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  }catch(error){
    console.error("Lỗi khi lất sản phẩm chưa khuyết mãi:", error);
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


export const addProductAPI = async(product: ProductRequest) => {
  const token = await checkToken();
  try {
    const res = await axios.post(`/products`, product, {
      headers: {
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      },
    });

    return res.data;
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
}

export const updateProductAPI = async (productId: string, product: ProductRequest) => {
  const token = await checkToken();
  try {
    const res = await axios.put(`/products/${productId}`, product, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};


export const deleteProductAPI = async (productId: string) => {
  const token = await checkToken();
  try {
    const res = await axios.delete(`/products/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};



