import React, { useEffect } from 'react';
import './AddCartButton.scss';
import { AddShoppingCart } from '../../services/ShoppingCartService';
import { Specifications, User } from '../../initialize/type';
import { openFailNotification, openSuccessNotification } from '../Notification';

interface Prop {
  specifications: Specifications; // Correct type
  user: User; // Correct type
}

const AddCartButton: React.FC<Prop> = ({ specifications, user }) => {
  
  const AddCartHandler = async () => {
    if (!specifications || !user) {
      openFailNotification("Vui lòng chọn thông số kỹ thuật để thêm vào giỏ hàng", "");
      return;
    }
  
    try {
      // Kiểm tra dữ liệu trước khi gửi yêu cầu
      console.log('Sending data:', specifications, user);
  
      // Gửi yêu cầu đến server
      await AddShoppingCart(specifications, user, 1);
    } catch (error) {
      // Thông báo lỗi nếu có
      openFailNotification("Đã có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại.", "");
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      <button type="submit" className="btn-add-cart" onClick={AddCartHandler}>
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default AddCartButton;
