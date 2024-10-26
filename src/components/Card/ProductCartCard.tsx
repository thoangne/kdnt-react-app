import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import QuantitySelector from '../../components/QuantitySelector';
import { CloseOutlined } from '@ant-design/icons';
import DefaultImage from '../../assets/DefaultImg.jpg';
import { deleteShoppingCartByUser, UpdateQuantityShoppingCart } from '../../services/ShoppingCartService';

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
    <Row>
      <Col xs={3}>
        <img src={imageURL || DefaultImage} width="100%" alt={name} />
      </Col>
      <Col xs={9}>
        <div>
          <h6>{name} <button onClick={deleteProductCard}>X</button></h6>
          {/* <CloseOutlined /> */}
        </div>
        <div>
          <span className="pre-price">{prePrice}</span>
          <span className="und-price">{undPrice}</span>
        </div>
        <span className="type-item">{typeItem}</span>
        <QuantitySelector initialQuantity={quantity} onQuantityChange={handleQuantityChange} /> {/* Pass handleQuantityChange as a callback */}
        <div className="selected-quantity">Số lượng: {quantity}</div> {/* Display the selected quantity */}
      </Col>
    </Row>
  );
};

export default ShoppingCartCard;
