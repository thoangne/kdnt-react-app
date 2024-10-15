import { Login } from "../initialize/type";
import axios from "./CustomizeAxios";

export const LoginAPI = (loginInfo: Login) => {
    return axios.post("/token", loginInfo); // Truyền trực tiếp đối tượng loginInfo
};


export const LogoutAPI = async (token: string) => {
    try {
        // Gửi request logout với token trong body
        const response = await axios.post(
            "/logout111", 
            { token }, // Sử dụng cú pháp ngắn gọn cho object
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data; // Trả về dữ liệu từ API nếu thành công
    } catch (error) {
        console.error("Lỗi khi gọi API logout:", error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};
