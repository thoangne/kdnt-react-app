import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Product, Promotion, PromotionProduct } from "../../../initialize/type";
import { Col, Row } from "react-bootstrap";
import "./PromotionDetail.scss";
import { fetchAllProductByPromotionIdAPI } from "../../../services/PromotionService";
import { displayImage } from "../../../services/ImageService";
import { SelectProducts } from "./SelectProducts";

const PromotionDetail: React.FC = () => {
    const { state } = useLocation();
    const { promotionId } = useParams<{ promotionId: string }>();
    const promotion = state?.promotion as Promotion;

    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getAllProductByPromotion = async() => {
            if(promotionId){
                const res = await fetchAllProductByPromotionIdAPI(promotionId);
                setProducts(res);
            }
            
        }
        getAllProductByPromotion();
    }, []);

    useEffect(() => {
        const loadImages = async () => {
          const res = await displayImage(products);
          if(res){
          setImageUrls(res); // Lưu URL ảnh vào state
    
          }
        };
    
        if (products.length > 0) {
          loadImages();
        }
      }, []); // Chạy lại khi `products` thay đổi
  return (
    <div className="p-container">
      <SelectProducts promotionId = {promotionId}></SelectProducts>
      <h2>Chi tiết khuyến mãi</h2>

      {promotion ? (
        <Row className="promotion-info-container">
            <Col md={6}>
                <table>
                    <tr>
                        <th>ID</th>
                        <td>{promotion.promotionId}</td>
                    </tr>
                    <tr>
                        <th>Code</th>
                        <td>{promotion.promotionCode}</td>
                    </tr>
                    <tr>
                        <th>Giảm giá tối đa</th>
                        <td>{promotion.discountAmount}đ</td>
                    </tr>
                    <tr>
                        <th>Phần trăm(%)</th>
                        <td>{promotion.discountPercentage + "%" || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Trạng thái</th>
                        <td>{promotion.status? "Đang sử dụng": "Hết hạn"}</td>
                    </tr>
                </table>
            </Col>

            <Col md={6}>
            <table>
                    <tr>
                        <th>Ngày bắt đầu</th>
                        <td>{promotion.startDate}</td>
                    </tr>
                    <tr>
                        <th>Ngày kết thúc</th>
                        <td>{promotion.endDate}</td>
                    </tr>
                    <tr>
                        <th>Cập nhật mới nhất</th>
                        <td>{promotion.updateDate || "N/A"}</td>
                    </tr>

                </table>
            </Col>
         
        </Row>
      ) : (
        <p>Không tìm thấy thông tin khuyến mãi cho ID: {promotionId}</p>
      )}

      {/* <SelectProducts></SelectProducts> */}
    <div className="pp-container">
      
        <h4>Các sản phẩm đang được áp dụng</h4>
      <div className="products-container">
        <table>
          <thead className="products-thead">
            <tr>
              <td>ID</td>
              <td>Hình ảnh</td>
              <td>Sản phẩm</td>
              <td>Giá</td>
              <td>Số lượng</td>
              <td>Trạng thái</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
                const imageUrl = imageUrls[product.productId];
              return (
                
                <tr key={product.productId}>
                  
                  <td><Link to={`/product-detail/${product.productId}`}>{product.productId}</Link></td>
                  <td>
                    <Link to={`/product-detail/${product.productId}`}>
                    {/* Nếu có ảnh, hiển thị ảnh; nếu không có, hiển thị "Không có ảnh" */}
                    {imageUrl ? (
                      <img src={imageUrl} alt={product.name} width="100" height="100" />
                    ) : (
                      <span>Không có ảnh</span>
                    )}
                      </Link>
                  </td>
                  <td className="product-name"> <Link to={`/product-detail/${product.productId}`}>{product.name}</Link></td>
                  <td>{product.specifications[0].price}</td>
                  <td>{product.specifications[0].quantity}</td>
                  <td className="status"> 
                    {product.specifications[0].quantity !== 0? (
                      <span>Còn hàng</span>
                    ) : (
                      <span>Hết hàng</span>
                    )}
                  </td>
                  <td>
                      {/* <ProductUpdateModal product = {product}></ProductUpdateModal> */}
                  </td>
                </tr>
                
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default PromotionDetail;
