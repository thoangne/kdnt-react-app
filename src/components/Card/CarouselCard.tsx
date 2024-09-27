import React from 'react'
import './CarouselCard.scss'
import { Card } from "react-bootstrap";
import defaultimg from '../../assets/DefaultImg.jpg';

export const CarouselCard = () => {
  return (
    <Card style={{ width: "18rem" }} className="mx-auto my-3">
      <Card.Img variant="top" src={defaultimg} alt="Product Image" />
      <Card.Body>
        <Card.Title>Tên Sản Phẩm</Card.Title>
        <Card.Text>
          Đây là mô tả ngắn của sản phẩm. Bạn có thể thêm bất kỳ thông tin nào bạn muốn về sản phẩm ở đây.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
