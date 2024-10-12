import React, { useState } from 'react';
import './QuantitySelector.scss'; // Import your custom styles

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrease quantity (but not below 1)
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="quantity-selector">
      <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
      <span className="quantity-display">{quantity}</span>
      <button className="quantity-btn" onClick={increaseQuantity}>+</button>
    </div>
  );
};

export default QuantitySelector;
