import axios from "./CustomizeAxios";

export const fetchAllCategory = () => {
  return axios.get("/categories");
}

export const fetchCategoryById = (categoryId: string) => {
    return axios.get(`/categories${categoryId}`);
}

export const deleteCategoryById = (categoryId: string) => {
  return axios.get(`/categories${categoryId}`);
}