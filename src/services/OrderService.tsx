import { Order, OrderItem } from "../initialize/type";
import axios from "./CustomizeAxios";
import { getToken } from "./TokenService";

export const createOrderAPI = async (order: Order) => {
    const token = getToken();
    try {
        const response = await axios.post("/order", order , {
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


export const createOrderItemAPI = async (orderItem: OrderItem) => {
    const token = getToken();
    try {
        const response = await axios.post("/orderItem", orderItem , {
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

