import React from "react";
import Card from "react-bootstrap/Card";
import card from "../../assets/card.jpg";
import { StarOutlined } from "@ant-design/icons";

const ProductCard: React.FC = () => {
  return (
    <Card style={{ width: "18rem", borderColor: "#fff" }}> 
      <Card.Img variant="top" src={card} alt="anh vi du" />
      <Card.Body>
        <Card.Title>
          <span className="font-card">Giường Ngủ Gỗ Tràm MOHO HOBRO 301</span>
        </Card.Title>
        <Card.Text> 
          <span className="price font-card">8,992,500₫ </span>
          <span
            className="sale-price"
            style={{
              textDecoration: "line-through",
              color: "grey",
              marginLeft: "10px",
            }}
          >
            11,990,000₫
          </span>
        </Card.Text>
        <Card.Text>
          <StarOutlined />
          <StarOutlined />
          <StarOutlined />
          <StarOutlined />
          <StarOutlined />
          <span> Đã bán</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
