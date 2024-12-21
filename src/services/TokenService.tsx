import Cookies from 'js-cookie';
// import { fetchMyInfo } from './UserService';
import {User} from "../initialize/type";
import { openFailNotification } from '../components/Notification';

// Hàm lấy token từ cookie
export const getToken = async () => {
    const token = Cookies.get('token'); // Lấy token từ cookie
    if (!token) {
      console.error("Token không tồn tại.");
      return null; // Hoặc xử lý theo cách bạn muốn
    }
    // Gọi API để lấy thông tin người dùng với token
    return token
  };

export const setToken = (token: string) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 100);
  Cookies.set("token", token, { expires}); // Lấy token từ cookie
};




export const checkToken = async () => {
  const token = await getToken();
  if (!token) {
    openFailNotification("Phiên đăng nhập đã hết hạn!", "Vui lòng đăng nhập")
    throw new Error("Token không tồn tại, vui lòng đăng nhập lại.");
  }
  return token;
};