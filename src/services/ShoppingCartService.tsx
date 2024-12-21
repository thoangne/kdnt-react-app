import axios from "./CustomizeAxios";
import { getToken } from "./TokenService";
import { ShoppingCart, Specifications, User } from "../initialize/type";
import  { openFailNotification, openSuccessNotification } from "../components/Notification";
import { useEffect, useState } from "react";
import ShoppingCartCard from "../components/Card/ProductCartCard";
import { useUserContext } from "../context/UserContext";
import { downloadFileS3 } from "./StorageService";
import { useNavigate } from "react-router-dom";


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

    // Tạo đối tượng data
    const data = {
      specifications: specifications,
      user: user,
      quantity: quantity,
    };

    // Gửi yêu cầu POST
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

  } catch (error: any) {
    // Kiểm tra lỗi từ server
    if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data.message || 'Lỗi không xác định';

      if (status === 400) {
        if (errorMessage === "Sản phẩm đã hết hàng!") {
          openFailNotification("Sản phẩm đã hết hàng", "Vui lòng chọn sản phẩm khác.");
        } else {
          openFailNotification("Lỗi đầu vào", errorMessage);
        }
      } else if (status === 500) {
        // Lỗi từ server (internal server error)
        openFailNotification("Lỗi hệ thống", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      } else {
        // Các lỗi khác
        openFailNotification("Thêm sản phẩm vào giỏ hàng thất bại!", "Vui lòng thử lại!");
      }
    } else {
      // Nếu lỗi không phải từ phản hồi của server
      openFailNotification("Lỗi mạng hoặc máy chủ", "Không thể kết nối đến máy chủ. Vui lòng thử lại!");
    }

    return null; // Trả về null khi gặp lỗi
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



export const LoadAllShoppingCart = () => {
  const [shoppingCartItem, setShoppingCartItem] = useState<ShoppingCart[]>([]);
  const { myInfo } = useUserContext();
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchImages = async () => {
      const urls: { [key: string]: string } = {};

      for (const item of shoppingCartItem) {
        const imageName = item?.specifications?.image?.[0]?.imageName;
        if (imageName) {
          try {
            const url = await downloadFileS3(imageName);
            urls[item.productCartId] = url;
          } catch (error) {
            console.error("Error downloading image:", error);
          }
        }
      }

      setImageUrls(urls);
    };

    if (shoppingCartItem.length > 0) {
      fetchImages();
    }
  }, [shoppingCartItem]);

  useEffect(() => {
    const getItem = async () => {
      try {
        if (myInfo) {
          const res = await fetchShoppingCartByUser(myInfo.userId);
          if (res) {
            setShoppingCartItem(res.data.productCartItem); 
          }
        }
      } catch (err) {
        setError("Không thể tải giỏ hàng. Vui lòng thử lại sau."); // Xử lý lỗi
        console.error(err);
      }
    };
    getItem(); // Gọi hàm async
  }, [myInfo]); // Phụ thuộc vào myInfo thay vì Sho
  return (
    <div>
      <div className="text-vol-cart">
        {shoppingCartItem.length > 0
          ? `Có ${shoppingCartItem.length} sản phẩm trong giỏ hàng`
          : "Giỏ hàng của bạn trống"}
      </div>
        {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi */}
        {shoppingCartItem && shoppingCartItem.map((item, index) =>{
          return (
            <ShoppingCartCard
              shoppingCartId = {item.productCartId}
              name={item.productName} // Hiển thị dữ liệu thực
              prePrice={item.specifications?.price} // Thay thế giá trị thực từ API
              undPrice={item.specifications?.price * (1- item.specifications?.discountPercent / 100)} // Thay thế giá trị thực từ API
              typeItem={`${item.specifications?.color + " / " + item.specifications?.height + " / " + item.specifications?.width + " / " + item.specifications?.length}` } // Hiển thị dữ liệu thực
              imageURL={imageUrls[item.productCartId] || "link-to-default-image.jpg"}
              initialQuantity={item.quantity} // URL ảnh sản phẩm
            />
          )
        })}
    </div>
  );
}
