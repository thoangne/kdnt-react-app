import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ProductDetail.scss";
import { Image } from "react-bootstrap";
import { FacebookFilled, StarFilled } from "@ant-design/icons";
import QuantitySelector from "./QuantitySelector";

export const ProductDetail = () => {
  const [mainImage, setMainImage] = useState("src/assets/DefaultImg.jpg");

  const images = [
    { id: 1, src: "src/assets/DefaultImg.jpg", alt: "Image 1" },
    { id: 2, src: "src/assets/doitra.png", alt: "Image 2" },
    { id: 3, src: "src/assets/DefaultImg.jpg", alt: "Image 3" },
    { id: 4, src: "src/assets/DefaultImg.jpg", alt: "Image 4" },
    { id: 5, src: "src/assets/DefaultImg.jpg", alt: "Image 5" },
  ];

  const [selectedColor, setSelectedColor] = useState("brown");

  const colors = [
    { name: "Nâu", hex: "#5D4037" },
    { name: "Da", hex: "#D2B48C" },
    { name: "Trắng", hex: "#FFFFFF" },
    { name: "Cream", hex: "#F5DEB3" },
  ];

  return (
    <>
      <Container>
        <Row>
          <Col xs={7}>
            <Row>
              <Col xs={2}>
                {images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.src}
                    alt={image.alt}
                    thumbnail
                    onClick={() => setMainImage(image.src)}
                    className="mb-3"
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </Col>
              <Col xs={10}>
                <Image src={mainImage} alt="Main" fluid />
              </Col>
            </Row>
          </Col>

          <Col xs={5}>
            <Row className="cust-rw">
              <Col>
                <Row>
                  <span className="text-cap">
                    Giường Ngủ Gỗ Tràm MOHO HOBRO 301
                  </span>
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
                      Chia sẽ: <FacebookFilled />
                    </span>
                  </Col>
                  <Col xs={3}>
                    <span className="size-f ">Đã bán: 000</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="size-f ">
                      <strong>SKU:</strong>MFBNCBD01.B18
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="d-flex cust-rw">
              <Col xs={2}>
                <span className="sale-tex">-25%</span>
              </Col>
              <Col xs={2}>
                <span className="tex-price">8,900,000₫</span>
              </Col>
              <Col xs={2}>
                <del className="tex-pre">11,900,000₫</del>
              </Col>
            </Row>
            <Row className=" cust-rw" xs={2}>
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
            <Row className="d-block ">
                <span className="size-f">Kích thước:</span>
                <span className="size-f">Dài 200cm x Rộng 60cm x Cao 2m1</span>
            </Row>
            <Row className="d-block ">
                <span className="size-f">Chất liệu:</span>
                <p className="size-f">
                - Cánh tủ + Thân tủ: Gỗ MFC phủ Melamine chuẩn CARB-P2 (*)
                </p>
                <p className="size-f">
                - Lưng tủ: Gỗ MDF phủ Melamine chuẩn CARB-P2 (*)
                </p>
                <p className="size-f">
                - Thanh treo: Hợp kim nhôm, chống gỉ sét
                </p>
            </Row>
            <Row className="d-block cust-rw">
                <span className="size-f">(*) Tiêu chuẩn California Air Resources Board xuất khẩu Mỹ, đảm bảo gỗ không độc hại, an toàn cho sức khỏe</span>
            </Row>
            <Row className="cust-rw-dif">
                <Col>
                  <QuantitySelector></QuantitySelector>
                </Col>
            </Row>
            <Row>
                <button className="btn-buy-item-le">Mua ngay</button>
            </Row>
            <Row>
                <button className="btn-buy-item">Nhận thông báo khi có hàng</button>
            </Row>
            <Row className="cust-rw-dif">
            <span className="size-f"> Miễn phí giao hàng & lắp đặt tại tất cả quận huyện thuộc TP.HCM, Hà Nội, Khu đô thị Ecopark, Biên Hòa và một số quận thuộc Bình Dương (*)</span>
            </Row>
            <Row className="cust-rw-dif">
            <span className="size-f"> Miễn phí 1 đổi 1 - Bảo hành 2 năm - Bảo trì trọn đời (**)</span>
            </Row>
            <Row className="cust-rw-dif">
            <span className="size-f">
            (*) Không áp dụng cho danh mục Đồ Trang Trí</span>
            </Row>
            <Row className="cust-rw-dif">
            <span className="size-f">
            (**) Không áp dụng cho các sản phẩm Clearance. Chỉ bảo hành 01 năm cho khung ghế, mâm và cần đối với Ghế Văn Phòng</span>
            </Row>

          </Col>
        </Row>
      </Container>
    </>
  );
};
