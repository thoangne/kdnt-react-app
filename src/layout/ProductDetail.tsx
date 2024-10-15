import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ProductDetail.scss";
import { Image } from "react-bootstrap";
import { FacebookFilled, StarFilled } from "@ant-design/icons";
import QuantitySelector from "../components/QuantitySelector";
import { useParams } from 'react-router-dom';
import { Product } from "../initialize/type";
import { fetchProductById } from "../services/ProductService";
import { downloadFileS3 } from "../services/StorageService";
import Default_Image from "../assets/DefaultImg.jpg"; // Ảnh mặc định


export const ProductDetail = () => {
  const [listImageUrl, setListImageUrl] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>(Default_Image); // Đặt ảnh mặc định là ảnh chính
  const [product, setProduct] = useState<Product>();
  const { productId } = useParams();

  // Hàm lấy danh sách URL ảnh từ S3
  const getListImageUrl = async () => {
    const listImageUrl: string[] = [];
    if (product?.specifications) {
      for (const spec of product.specifications) {
        if (spec?.image?.length > 0) {
          for (const image of spec.image) {
            const url = await downloadFileS3(image.imageName);
            listImageUrl.push(url);
          }
        }
      }
    }
    return listImageUrl;
  };

  // Lấy thông tin sản phẩm khi có productId
  useEffect(() => {
    const getProductById = async () => {
      if (productId) {
        const res = await fetchProductById(productId);
        setProduct(res.data);
      }
    };
    getProductById();
  }, [productId]);

  // Lấy danh sách ảnh từ S3 khi đã có product
  useEffect(() => {
    const fetchImages = async () => {
      if (product) {
        const list = await getListImageUrl();
        if (list && list.length > 0) {
          setListImageUrl(list); 
          setMainImage(list[0]); // Thiết lập ảnh chính là ảnh đầu tiên
        }
      }
    };

    fetchImages();
  }, [product]);

  const [selectedColor, setSelectedColor] = useState("brown");

  const colors = [
    { name: "Nâu", hex: "#5D4037" },
    { name: "Da", hex: "#D2B48C" },
    { name: "Trắng", hex: "#FFFFFF" },
    { name: "Cream", hex: "#F5DEB3" },
  ];

  return (
    <Container>
      <Row>
        <Col xs={7}>
          <Row>
            <Col xs={2}>
              {listImageUrl.map((url, index) => (
                <Image
                  key={index}
                  src={url || Default_Image} // Nếu URL không có thì hiển thị ảnh mặc định
                  thumbnail
                  onClick={() => setMainImage(url)} // Đổi ảnh chính khi click
                  className="mb-3"
                  style={{ cursor: "pointer" }}
                />
              ))}
            </Col>
            <Col xs={10}>
              <Image src={mainImage || Default_Image} alt="Main" fluid /> {/* Hiển thị ảnh chính */}
            </Col>
          </Row>
        </Col>

        <Col xs={5}>
          {/* Nội dung chi tiết sản phẩm */}
          <Row className="cust-rw">
            <Col>
              <Row>
                <span className="text-cap">{product?.name}</span>
              </Row>
              <Row>
                <Col xs={6}>
                  <StarFilled className="star-cust" />
                  <StarFilled className="star-cust" />
                  <StarFilled className="star-cust" />
                  <StarFilled className="star-cust" />
                  <StarFilled className="star-cust" />
                  <span className="size-f">(00)</span>
                </Col>
                <Col xs={3}>
                  <span className="size-f">
                    Chia sẻ: <FacebookFilled />
                  </span>
                </Col>
                <Col xs={3}>
                  <span className="size-f">Đã bán: 000</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className="size-f">
                    <strong>SKU: {product?.productId}</strong>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Thông tin sản phẩm khác */}
          <Row className="d-flex cust-rw">
            <Col xs={2}>
              <span className="sale-tex">-25%</span>
            </Col>
            <Col xs={2}>
              <span className="tex-price">8,900,000₫</span>
            </Col>
            <Col xs={2}>
              <del className="tex-pre">{product?.specifications[0].price}</del>
            </Col>
          </Row>

          {/* Thông tin về màu sắc */}
          <Row className="cust-rw" xs={2}>
            <Col>
              <Row className="color-selector">
                <span className="color-label">{selectedColor}</span>
                {colors.map((color) => (
                  <label key={color.name} className="color-option">
                    <input
                      type="radio"
                      name="color"
                      value={color.name}
                      checked={selectedColor === color.name}
                      onChange={() => setSelectedColor(color.name)}
                    />
                    <span
                      className="color-circle"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                  </label>
                ))}
              </Row>
            </Col>
          </Row>

          {/* Các phần thông tin khác */}
          {/* ... */}
        </Col>
      </Row>
    </Container>
  );
};
