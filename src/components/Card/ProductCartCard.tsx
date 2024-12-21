import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import QuantitySelector from '../../components/QuantitySelector';
import "./ProductCartCard.scss";
import { CloseOutlined } from '@ant-design/icons';
import DefaultImage from '../../assets/DefaultImg.jpg';
import { deleteShoppingCartByUser, UpdateQuantityShoppingCart } from '../../services/ShoppingCartService';
import { TiDeleteOutline } from "react-icons/ti";

interface Props {
  shoppingCartId: string;
  name: string;
  prePrice: number;
  undPrice: number;
  typeItem: string;
  imageURL: string;
  initialQuantity?: number; // Optional prop to set initial quantity
}

const ShoppingCartCard: React.FC<Props> = ({ shoppingCartId, name, prePrice, undPrice, typeItem, imageURL, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity); // Default to 1 if initialQuantity is not provided

  const deleteProductCard = async() => {
      await deleteShoppingCartByUser(shoppingCartId);
  }
  // Function to handle quantity change from QuantitySelector
  const handleQuantityChange = async (newQuantity: number) => {
    setQuantity(newQuantity);
    
    try {
      await UpdateQuantityShoppingCart(shoppingCartId, newQuantity);
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng giỏ hàng:', error);
    }
  };

  return (
    <div className='shopping-cart-container'>
    <Row >
      <Col xs={3}>
        <img src={imageURL || DefaultImage} width="80%" alt={name} />
      </Col>
      <Col xs={9}>
        <div>
          <h5 className='p-name'>{name} <button className='delete-p-button' onClick={deleteProductCard}><TiDeleteOutline/></button></h5>
          {/* <CloseOutlined /> */}
        </div>
        <div>
          <span className="pre-price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(undPrice)}</span>
          <span className="und-price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(prePrice)}</span>
        </div>
        <span className="type-item">{typeItem}</span>
        <QuantitySelector initialQuantity={quantity} onQuantityChange={handleQuantityChange} /> {/* Pass handleQuantityChange as a callback */}
        
      </Col>
    </Row>
    </div>
  );
};

export default ShoppingCartCard;
