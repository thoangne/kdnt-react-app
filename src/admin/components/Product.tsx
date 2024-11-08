import React from 'react';
import { Table, Button } from 'react-bootstrap';
import './Product.scss'
export type Specifications = {
  id?: number;
  price?: number;
  quantity?: number;
  color: string;
  height?: string;
  width?: string;
  length?: string;
  size?: string;
  image: string; // URL của hình ảnh sản phẩm
};

export type Product = {
  productId?: string;
  name?: string;
  description?: string;
  createAt?: Date;
  status?: boolean;
  specifications: Specifications;
};

// Danh sách sản phẩm mẫu
const productData: Product[] = [
  {
    productId: 'P001',
    name: 'Sản phẩm 1',
    description: 'Mô tả sản phẩm 1',
    createAt: new Date(),
    status: true,
    specifications: {
      id: 1,
      price: 1500,
      quantity: 10,
      color: 'Đen',
      height: '1m',
      width: '0.5m',
      length: '2m',
      size: 'Lớn',
      image: 'https://via.placeholder.com/150'
    }
  },
  {
    productId: 'P002',
    name: 'Sản phẩm 2',
    description: 'Mô tả sản phẩm 2',
    createAt: new Date(),
    status: false,
    specifications: {
      id: 2,
      price: 1000,
      quantity: 5,
      color: 'Trắng',
      height: '1.5m',
      width: '0.6m',
      length: '1.8m',
      size: 'Vừa',
      image: 'https://via.placeholder.com/150'
    }
  }
];

function Product() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ID Sản phẩm</th>
          <th>Tên sản phẩm</th>
          <th>Mô tả</th>
          <th>Ngày tạo</th>
          <th>Trạng thái</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Màu sắc</th>
          <th>Chiều cao</th>
          <th>Chiều rộng</th>
          <th>Chiều dài</th>
          <th>Kích thước</th>
          <th>Hình ảnh</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {productData.map((product, index) => (
          <tr key={product.productId}>
            <td>{index + 1}</td>
            <td>{product.productId}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.createAt?.toLocaleDateString()}</td>
            <td>{product.status ? 'Active' : 'Inactive'}</td>
            <td>{product.specifications.price?.toLocaleString()} VND</td>
            <td>{product.specifications.quantity}</td>
            <td>{product.specifications.color}</td>
            <td>{product.specifications.height}</td>
            <td>{product.specifications.width}</td>
            <td>{product.specifications.length}</td>
            <td>{product.specifications.size}</td>
            <td>
              <img src={product.specifications.image} alt={product.name} width="50" height="50" />
            </td>
            <td>
              <Button variant="primary" className="custom-btn-for">Chỉnh sửa</Button>
              <Button variant="danger" className="custom-btn-for">Xóa</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Product;
