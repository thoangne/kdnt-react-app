import { Register, User } from "../initialize/type";
import axios from "./CustomizeAxios";
import { checkToken, getToken } from "./TokenService";

// Hàm gọi API để lấy thông tin người dùng với token
export const fetchMyInfo = async (token: string) => {
    try {
        const response = await axios.get("/user/my-info", {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gọi API lấy thông tin người dùng: ", error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};

export const RegisterAPI = async (register: Register) => {
    try {
        const response = await axios.post("/user", register , {
            headers: {
              'Content-Type': 'application/json'
            },
    });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gọi API lấy thông tin người dùng: ", error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};

export const UpdateUserInfoAPI = async (userId: string,user: User) => {
    try {
        const token = await checkToken();
        const response = await axios.put(`/user/${userId}`, user , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
    });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gọi API lấy thông tin người dùng: ", error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};


export const fetchAllUser = async() => {
    const token = await checkToken();
    try {
      const res = await axios.get(`/user`, {
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
      });
  
      return res.data;
    } catch (error) {
      console.error("Lỗi khi lấy tất cả sản phẩm:", error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  }

