import { Order, OrderItem } from "../initialize/type";
import axios from "./CustomizeAxios";
import { checkToken, getToken } from "./TokenService";

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


export const fetchOrderByStatus = async (status: string) => {
    const token = await checkToken();
    try {
        const response = await axios.get(`/orders/status/${status}` , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
    });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gọi API lấy đơn hàng theo trạng thái: ", error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};


export const fetchAllOrders = async () => {
    const token = await checkToken();
    try {
        const response = await axios.get(`/orders` , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
    });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gọi API lấy đơn hàng theo trạng thái: ", error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};


export const updateStatusOrderAPI = async (order: Order) => {
    const token = await checkToken();
    try {
        const response = await axios.put("/orders/update-status", order , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
    });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gọi API xác nhân đơn hàng: ", error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};

export const cancelOrderAPI = async (orderId: string) => {
    const token = await checkToken();
    try {
        const response = await axios.put(`/orders/cancel-order/${orderId}`,{}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
    });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gọi API hủy đơn hàng: ", error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};

export const fetchOrderByUserAndStatus = async (userId: string, status: string) => {
    const token = await checkToken();
    try {
        const response = await axios.get(`/orders/${userId}/${status}` , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
    });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Lỗi khi gọi API lấy đơn hàng theo trạng thái: ", error);
        throw error; // Ném lỗi để xử lý ở phía gọi hàm
    }
};


