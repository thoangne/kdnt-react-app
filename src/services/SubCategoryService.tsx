import { SubCategoryRequest } from "../initialize/type";
import axios from "./CustomizeAxios";
import { checkToken } from "./TokenService";

export const fetchAllSubCategory = async() => {
  try{
    const res = await axios.get("/sub-category");
    return res.data;
  }catch(error){
    console.error("Lỗi khi load sub category:", error);
    throw error;
  }
}

export const fetchSubCategoryById = async(subCategoryId: string) => {
  try{
    const res = await axios.get(`/sub-category/${subCategoryId}`);
    return res.data;
  }catch(error){
    console.error("Lỗi khi load sub categoryId :", error);
    throw error;
  }
}

export const updateSubCategoryAPI = async (subCategoryId: number, subCategory: SubCategoryRequest) => {
  const token = await checkToken();
  try {
    const res = await axios.put(`/sub-category/${subCategoryId}`, subCategory, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sub-category:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};




