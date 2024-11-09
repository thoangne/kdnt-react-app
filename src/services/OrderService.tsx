import { Order, OrderItem } from "../initialize/type";
import axios from "./CustomizeAxios";
import { getToken } from "./TokenService";

export const createOrderAPI = async (order: Order) => {
    const token = await getToken();
    try {
        const response = await axios.post("/orders", order , {
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
    const token = await getToken();
    try {
        console.log("Dữ liệu gửi lên API: " + JSON.stringify(orderItem));
        const response = await axios.post("/order-item", orderItem, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error: any) {
        // Kiểm tra và log lỗi không dùng isAxiosError
        console.error("Lỗi khi gọi API:", error.response ? error.response.data : error.message);
        console.error("Chi tiết Response:", error.response || error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};



