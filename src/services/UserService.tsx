import axios from "./CustomizeAxios";

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
