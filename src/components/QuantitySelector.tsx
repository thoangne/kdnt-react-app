import React, { useState, useEffect } from 'react';
import './QuantitySelector.scss'; // Import your custom styles

interface QuantitySelectorProps {
  onQuantityChange: (quantity: number) => void; // Callback prop
  initialQuantity?: number; // New prop for initial quantity
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ onQuantityChange, initialQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity); // Set initial state from prop

  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrease quantity (but not below 1)
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Call the callback function whenever quantity changes
  useEffect(() => {
    onQuantityChange(quantity); // Pass the current quantity to the parent component
  }, [quantity, onQuantityChange]);

  return (
    <div className="quantity-selector">
      <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
      <span className="quantity-display">{quantity}</span>
      <button className="quantity-btn" onClick={increaseQuantity}>+</button>
    </div>
  );
};

export default QuantitySelector;
