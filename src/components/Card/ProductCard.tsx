import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import card from "../../assets/card.jpg";
import DefaultImg from "../../assets/DefaultImg.jpg";
import { StarOutlined } from "@ant-design/icons";
import './ProductCard.scss';
import { Product } from "../../initialize/type";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageUrl, setImageUrl] = useState<string>();

  // Kiểm tra nếu sản phẩm có ảnh
  const productImage = product?.specifications?.[0]?.image?.[0]?.imageName;

  useEffect(() => {
    if (productImage) {
      handleDownload(productImage);
    }
  }, [productImage]);

  const handleDownload = async (imageName: string) => {
    try {
      const response = await fetch(`http://localhost:8081/file/download/${imageName}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <Card style={{ width: "18rem", borderColor: "#fff" }}>
      {/* Hiển thị ảnh tải từ S3 hoặc ảnh mặc định */}
      <Card.Img variant="top" src={imageUrl || DefaultImg} alt="Product image" />
      <Card.Body>
        <Card.Title>
          <span id="font-card">{product.name}</span>
        </Card.Title>
        <Card.Text>
          <span className="price color-price">
            {product.specifications?.[0]?.price || "N/A"}
          </span>
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
        <Card.Text className="d-flex justify-content-between align-items-center">
          <div>
            <StarOutlined className="price color-start" />
            <StarOutlined className="price color-start" />
            <StarOutlined className="price color-start" />
            <StarOutlined className="price color-start" />
            <StarOutlined className="price color-start" />
          </div>
          <span className="price">Đã bán</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
