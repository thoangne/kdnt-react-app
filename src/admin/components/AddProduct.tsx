import React, { useState } from 'react';
import { Dropdown, Form, Button } from 'react-bootstrap';

function AddProduct() {
  const [selectedOptions, setSelectedOptions] = useState({
    gia: {},
    mausac: {},
    chieucao: {},
    chieudai: {},
    kichthuoc: {},
  });

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const categories = [
    { key: 'gia', label: 'Giá', options: ['500 - 1000', '1000 - 1500', '1500 trở lên'] },
    { key: 'mausac', label: 'Màu sắc', options: ['Nâu', 'Trắng', 'Vàng', 'Đen'] },
    { key: 'chieucao', label: 'Chiều cao', options: ['1m', '2m', '3m'] },
    { key: 'chieudai', label: 'Chiều dài', options: ['1m', '2m', '3m'] },
    { key: 'kichthuoc', label: 'Kích thước', options: ['Nhỏ', 'Vừa', 'Lớn'] },
  ];

  const handleCheckboxChange = (categoryKey, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [categoryKey]: {
        ...prevState[categoryKey],
        [option]: !prevState[categoryKey][option],
      },
    }));
  };

  const handleSubmit = () => {
    const selectedItems = {
      productName,
      productDescription,
      options: Object.entries(selectedOptions).reduce((acc, [key, options]) => {
        acc[key] = Object.keys(options).filter((option) => options[option]);
        return acc;
      }, {}),
    };

    alert(`Selected items: ${JSON.stringify(selectedItems, null, 2)}`);
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productDescription">
          <Form.Label>Mô tả sản phẩm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập mô tả"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </Form.Group>
      </Form>

      {categories.map(({ key, label, options }) => (
        <Dropdown key={key} className="mb-2">
          <Dropdown.Toggle variant="primary" id={`dropdown-${key}`}>
            {label}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Form>
              {options.map((option) => (
                <Form.Check
                  key={option}
                  type="checkbox"
                  label={option}
                  checked={selectedOptions[key][option] || false}
                  onChange={() => handleCheckboxChange(key, option)}
                />
              ))}
            </Form>
          </Dropdown.Menu>
        </Dropdown>
      ))}

      <Button onClick={handleSubmit} className="mt-2">
        Submit
      </Button>
    </>
  );
}

export default AddProduct;
