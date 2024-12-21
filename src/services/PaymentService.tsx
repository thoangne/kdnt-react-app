import { checkToken } from "./TokenService";
import axios from "./CustomizeAxios";

export const fetchPayPalClientId = async () => {
  try {
    const token = await checkToken(); // Kiểm tra và lấy token
    const res = await axios.get(`/paypal/clientId`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Thêm token vào header
      },
    });

    // Kiểm tra nếu response chứa dữ liệu cần thiết
    if (res) {
      return res; // Giả sử response có cấu trúc { clientId: '...' }
    } else {
      throw new Error("Không tìm thấy clientId trong response.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy clientId PayPal:", error);
    // Bạn có thể ném lỗi ra ngoài để xử lý ở nơi gọi hoặc trả về giá trị mặc định
    throw error; // Hoặc return null nếu bạn không muốn ném lỗi
  }
};
