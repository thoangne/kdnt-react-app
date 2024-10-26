import React from 'react';
import './AddCartButton.scss';
import { AddShoppingCart } from '../../services/ShoppingCartService';
import { Specifications, User } from '../../initialize/type';

interface Prop {
  specifications: Specifications; // Correct type
  user: User; // Correct type
}

const AddCartButton: React.FC<Prop> = ({ specifications, user }) => {
  const AddCartHandler = async () => {
    await AddShoppingCart(specifications, user, 1);
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
