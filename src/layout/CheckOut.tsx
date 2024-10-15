import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./CheckOut.scss";
import { CloseOutlined } from "@ant-design/icons";
import QuantitySelector from "../components/QuantitySelector";

export const CheckOut = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="name-cart">Giỏ hàng của bạn</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Row>
              <Col>
                <span className="text-vol-cart">
                  Có 1 sản phẩm trong giỏ hàng
                </span>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <img src="../assets/DefaultImg.jpg" alt="" />
              </Col>
              <Col xs={10}>
                <Row>
                  <Col className="caption-cart-item">
                    <h6>Giường Ngủ Gỗ Tràm MOHO VLINE 601 Nhiều Kích Thước</h6>
                    <CloseOutlined />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="pre-price">1.111.111</span>
                    <span className="und-price">2.222.222</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="type-item">Nâu / 1m4 / Tấm Phản</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <QuantitySelector></QuantitySelector>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
                    <Row className="bor-der">
                        <Col className="pd-cust">
                            <Row>
                                <Col className="allter">
                                    <h3>Thông tin đơn hàng</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="fqdss">
                                    <h3>Tổng tiền</h3>
                                    <h3 className="hellll">5,900,000</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="allter fs">
                                    <button className="btn-checkout">Thanh toán</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
