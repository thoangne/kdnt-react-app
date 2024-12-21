import { Category } from "../initialize/type";
import axios from "./CustomizeAxios";
import { checkToken } from "./TokenService";

export const fetchAllCategory = async() => {
  try{
    const res = await axios.get("/categories");
    console.log("XXXXXXXXXXXXXXXXXXXXX" + JSON.stringify(res.data.data))
    return res.data;
  }
  catch(error){
    return error;
  }
}

export const fetchCategoryById = (categoryId: string) => {
    return axios.get(`/categories${categoryId}`);
}

export const deleteCategoryById = async(categoryId: string) => {

  const token = await checkToken();
  try {
    const res = await axios.delete(`/categories/${categoryId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
}



export const updateCategoryAPI = async (categoryId: string, category: Category) => {
  const token = await checkToken();
  try {
    const res = await axios.put(`/categories/${categoryId}`, category, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật doanh mục:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const addCategoryAPI = async (category: Category) => {
  const token = await checkToken();
  try {
    const res = await axios.post(`/categories`, category, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi thêm doanh mục:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};