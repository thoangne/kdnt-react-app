import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import DefaultImg from "../../assets/DefaultImg.jpg";
import { StarOutlined } from "@ant-design/icons";
import './ProductCard.scss';
import { Product } from "../../initialize/type";
import { downloadFileS3 } from "../../services/StorageService";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageUrl, setImageUrl] = useState<string>();

  const productImage = product?.specifications?.[0]?.image?.[0]?.imageName;

  useEffect(() => {
    if (productImage) {
      handleDownload(productImage);
    }
  }, [productImage]);

  const handleDownload = async (imageName: string) => {
    try {
      const url = await downloadFileS3(imageName);
      setImageUrl(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      setImageUrl(DefaultImg); // Nếu có lỗi, hiển thị ảnh mặc định
    }
  };

  const formattedPrice = product.specifications?.[0]?.price
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
      }).format(
        product.specifications[0].price *
        (1 - (product.specifications[0].discountPercent / 100 || 0))
      )
    : "N/A";

  const originalPrice = product.specifications?.[0]?.discountPercent !== 0
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(product.specifications[0].price)
    : null;


    const totalQuantity = (product.specifications as any[])?.reduce(
      (sum, specification: any) => sum + (specification.quantity || 0),
      0
    );

  const stockStatus = totalQuantity === 0
    ? "Hết hàng"
    : totalQuantity < 15 && totalQuantity > 0
    ? `Chỉ còn ${totalQuantity}`
    : null;



    
  return (
    <Card style={{ width: "18rem", borderColor: "#fff" }}>
      {/* Hiển thị ảnh tải từ S3 hoặc ảnh mặc định */}
      <Card.Img variant="top" src={imageUrl || DefaultImg} alt="Product image" />
      <Card.Body className="card-p-body">
        <Card.Title>
          <span id="font-card">{product.name}</span>
        </Card.Title>
        <Card.Text>
          <span className="price color-price">
            {formattedPrice}
          </span>
          {product.specifications?.[0]?.discountPercent !== 0 && (
            <span className="discount-percent">
              -{product.specifications?.[0]?.discountPercent}%
            </span>
          )}
          {originalPrice && (
            <span
              className="sale-price price"
              style={{
                textDecoration: "line-through",
                color: "grey",
                marginLeft: "10px",
              }}
            >
              {originalPrice}
            </span>
          )}
        </Card.Text>
        <Card.Text className="d-flex justify-content-between align-items-center">
          <div>
            {/* Hiển thị các sao đánh giá */}
            {[...Array(5)].map((_, index) => (
              <StarOutlined key={index} className="price color-start" />
            ))}
          </div>
          {stockStatus && (
            <span
              className={`stock-status ${
                product.specifications?.[0]?.quantity === 0
                  ? "het-hang"
                  : (product.specifications?.[0]?.quantity < 15 && product.specifications?.[0]?.quantity) > 0
                  ? "sap-het"
                  : ""
              }`}
            >
              {stockStatus}
            </span>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
