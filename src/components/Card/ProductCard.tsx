import React from "react";
import Card from "react-bootstrap/Card";
import card from "../../assets/card.jpg";
import { StarOutlined } from "@ant-design/icons";
import './ProductCard.scss'

const ProductCard: React.FC = () => {
  return (
    <Card style={{ width: "18rem", borderColor: "#fff" }}> 
      <Card.Img variant="top" src={card} alt="anh vi du" />
      <Card.Body>
        <Card.Title>
          <span id="font-card">Giường Ngủ Gỗ Tràm MOHO HOBRO 301</span>
        </Card.Title>
        <Card.Text> 
          <span className="price color-price ">8,992,500₫ </span>
          <span
            className="sale-price price"
            style={{
              textDecoration: "line-through",
              color: "grey",
              marginLeft: "10px",
            }}
          >
            11,990,000₫
          </span>
        </Card.Text>
        <Card.Text className="d-flex justify-content-between align-items-center" >
          <div>
          <StarOutlined className="price color-start" />
          <StarOutlined className="price color-start" />
          <StarOutlined  className="price color-start" />
          <StarOutlined  className="price color-start"/>
          <StarOutlined className="price color-start"/>
          </div>
          <span className="price "> Đã bán</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
