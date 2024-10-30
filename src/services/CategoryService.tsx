import axios from "./CustomizeAxios";

export const fetchAllCategory = async() => {
  try{
    const res = await axios.get("/categories");
    return res.data;
  }
  catch(error){
    return error;
  }
  
}

export const fetchCategoryById = (categoryId: string) => {
    return axios.get(`/categories${categoryId}`);
}

export const deleteCategoryById = (categoryId: string) => {
  return axios.get(`/categories${categoryId}`);
}