import axios from "./CustomizeAxios";

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




