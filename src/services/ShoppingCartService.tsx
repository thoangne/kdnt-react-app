import axios from "./CustomizeAxios";
import { getToken } from "./TokenService";
import { Specifications, User } from "../initialize/type";
import  { openFailNotification, openSuccessNotification } from "../components/Notification";


export const fetchShoppingCartByUser = async (UserId: string) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token không tồn tại, vui lòng đăng nhập lại.");
    }

    const response = await axios.get(`/shoppingCarts/list/${UserId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi xem giỏ hàng:", error);
    return null; // Trả về null nếu gặp lỗi
  }
};



export const UpdateQuantityShoppingCart = async (shoppingCartId: string, quantity: number) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token không tồn tại, vui lòng đăng nhập lại.");
    }

    const response = await axios.put(`/shoppingCarts/quantity/${shoppingCartId}/${quantity}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log(`/shoppingCarts/quantity/${shoppingCartId}/${quantity}`)
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng:", error);
    return null; // Trả về null nếu gặp lỗi
  }
};



export const AddShoppingCart = async (specifications: Specifications, user: User, quantity: number) => {
  
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token không tồn tại, vui lòng đăng nhập lại.");
      
    }

    // Tạo đối tượng data mà không cần khai báo chi tiết từng thuộc tính, sử dụng thẳng đối tượng specifications và user
    const data = {
      specifications: specifications, // Truyền thẳng đối tượng specifications
      user: user,                     // Truyền thẳng đối tượng user
      quantity: quantity               // Số lượng sản phẩm
    };

    // Gửi yêu cầu POST với body là data
    const response = await axios.post(`/shoppingCarts`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.data) {
      openSuccessNotification("Thành công", "Số lượng sản phẩm đã được cập nhật.");
    }
    return response.data;

  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    openFailNotification("Thêm sản phẩm vào giỏ hàng thất bại!", "Vui lòng đăng nhập!");
    return null; // Trả về null nếu gặp lỗi
  }
};


export const deleteShoppingCartByUser = async (shoppingCartId: string) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Token không tồn tại, vui lòng đăng nhập lại.");
    }

    const response = await axios.delete(`/shoppingCarts/${shoppingCartId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    openSuccessNotification("Xóa sản phẩm thành công!", "");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    return response.data;
  } catch (error) {
    openFailNotification("Xóa sản phẩm thất bại!", "Vui lòng đăng nhập!");
    return null; // Trả về null nếu gặp lỗi
  }
};

