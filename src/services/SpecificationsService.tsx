import { openFailNotification, openSuccessNotification } from "../components/Notification";
import { checkToken } from "./TokenService";
import axios from "./CustomizeAxios";
import { SpecificationRequest } from "../initialize/type";

export const addSpecificationAPI = async(specifications: any) => {
    const token = await checkToken();
    try {
      const res = await axios.post(`/specifications`, specifications, {
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
      });
  
      return res.data;
    } catch (error) {
      console.error("Lỗi khi thêm thông số kỹ thuật:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }


  export const updateSpecificationAPI = async(specifications: SpecificationRequest) => {
    const token = await checkToken();
    try {
      const res = await axios.put(`/specifications`, specifications, {
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
      });
  
      return res.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật thông số kỹ thuật:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }

  export const fetchAllSpecificationAPI = async(productId: string) => {
    try {
      const res = await axios.get(`/specifications/by-pid/${productId}`);
  
      return res.data;
    } catch (error) {
      console.error("Lỗi khi lấy tất cả specification:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }