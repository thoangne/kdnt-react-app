import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import FormInput from "../components/Card/FormInput";
import "./PayOut.scss";
export const PayOut = () => {
  const thanhPho = [
    { id: "12", name: "tp hcm" },
    { id: "13", name: "ninh thuan" },
  ];
  return (
    <>
      <Container>
        <Row>
          <Col xs={7}>
            <h1>Nội thất MOHO</h1>
            <div>
              <span>Giỏ hàng</span>
              <span></span>
              <span>Thông tin giao hàng</span>
            </div>
            <div>
              <h3>Thông tin giao hàng</h3>
              <div className="user-custom">
                <img src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg" />
                <div className="user-custom-sub">
                  <span>Tên người dùng</span>
                  <a href="">Đăng xuất</a>
                </div>
              </div>

              <div>
                <FormInput
                  controlid={""}
                  caption={""}
                  type={""}
                  placeholder={"Họ"}
                  value={""}
                  onChange={function (
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                ></FormInput>

                <FormInput
                  controlid={""}
                  caption={""}
                  type={""}
                  placeholder={"Tên"}
                  value={""}
                  onChange={function (
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                ></FormInput>
                <FormInput
                  controlid={""}
                  caption={""}
                  type={""}
                  placeholder={"Số điện thoại"}
                  value={""}
                  onChange={function (
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                ></FormInput>
                <FormInput
                  controlid={""}
                  caption={""}
                  type={""}
                  placeholder={"Địa chỉ"}
                  value={""}
                  onChange={function (
                    e: React.ChangeEvent<HTMLInputElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                ></FormInput>

                <Form className="d-flex">
                  {/* Province/City Selection */}
                  <Form.Group controlId="customer_shipping_province">
                    <Form.Label>Tỉnh/ Thành</Form.Label>
                    <Form.Control
                      as="select"
                      name="customer_shipping_province"
                      defaultValue="null"
                    >
                      <option data-code="null" value="null">
                        Chọn tỉnh/ thành
                      </option>
                      <option data-code="HCM" value={thanhPho[1].id}>
                        {thanhPho[1].name}
                      </option>
                    </Form.Control>
                  </Form.Group>

                  {/* District Selection */}
                  <Form.Group controlId="customer_shipping_district">
                    <Form.Label>Quận/ Huyện</Form.Label>
                    <Form.Control
                      as="select"
                      name="customer_shipping_district"
                      defaultValue="null"
                    >
                      <option data-code="null" value="null">
                        Chọn quận/ huyện
                      </option>
                    </Form.Control>
                  </Form.Group>

                  {/* Ward Selection */}
                  <Form.Group controlId="customer_shipping_ward">
                    <Form.Label>Phường/ Xã</Form.Label>
                    <Form.Control
                      as="select"
                      name="customer_shipping_ward"
                      defaultValue="null"
                    >
                      <option data-code="null" value="null">
                        Chọn phường/ xã
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
            </div>
            <h3>Phương thức vận chuyển</h3>
            <Form.Group className="custom-box-gr" controlId="formBasicCheckbox">
              <Form.Check
                className="custom-box-input"
                type="radio"
                label="
Miễn phí giao hàng & lắp đặt tại tất cả quận huyện thuộc TP.HCM đối với các sản phẩm nội thất. Các sản phẩm thuộc danh mục Đồ Trang Trí, phí giao hàng sẽ được MOHO liên hệ báo sau."
              />
            </Form.Group>

            <h3>Phương thức thanh toán</h3>
            <Form className="custom-box-gr">
              {/* Radio Button Section */}
              <Form.Group controlId="formBasicRadio">
                <Form.Check
                  className=""
                  type="radio"
                  label="Thanh toán bằng tiền mặt"
                  name="gender"
                  id="genderMale"
                />
                <Form.Check
                  type="radio"
                  label="Thanh toán bằng chuyển khoản"
                  name="gender"
                  id="genderFemale"
                />
                <Form.Check
                  type="radio"
                  label="Thanh toán online qua cổng VNPay (ATM/Visa/MasterCard/JCB/QR Pay trên Internet Banking) "
                  name="gender"
                  id="genderOther"
                />
                <Form.Check
                  type="radio"
                  label="Ví MoMo "
                  name="gender"
                  id="genderOther"
                />
              </Form.Group>
            </Form>
            <div className="custom-subb">
              <a href="">Đơn hàng</a>
              <Button type="submit">Hoàn tất đơn hàng</Button>
            </div>
          </Col>
          <Col xs={5}>
            <Card className="mb-3">
              <Row className="align-items-center p-3">
                <Col className="img-custom-payout" xs={3}>
                <img src="https://product.hstatic.net/200000065946/product/pro_nau_noi_that_moho_giuong_ngu_go_tram_vline_1m8_a_6ba57dbc2c7943509208badc020decf8_small.jpg" alt="" />
                </Col>
                <Col xs={6}>
                  <Card.Text>
                    <strong>
                      Giường Ngủ Gỗ Tràm MOHO VLINE 601 Nhiều Kích Thước
                    </strong>
                    <br />
                    Nâu / 1m4 / Tấm Phần
                  </Card.Text>
                </Col>
                <Col xs={3} className="text-end">
                  <strong>5,990,000₫</strong>
                </Col>
              </Row>
            </Card>

            {/* Discount Code Section */}
            <Row className="align-items-center mb-3">
              <Col xs={8}>
                <Form.Control type="text" placeholder="Mã giảm giá" />
              </Col>
              <Col xs={4}>
                <Button variant="secondary" className="w-100">
                  Sử dụng
                </Button>
              </Col>
            </Row>

            {/* Loyalty Program Section */}
            <Card className="mb-3 p-3 loyalty-section">
              <Card.Text>
                <strong>Khách hàng thân thiết</strong>
                <br />
                <small>
                  (Không thể sử dụng chung với các khuyến mãi khác.)
                </small>
                <br />
                <span>🖤 Member • 0 điểm thưởng</span>
              </Card.Text>
            </Card>

            {/* Pricing Summary Section */}
            <Row className="mb-3">
              <Col xs={8}>Tạm tính</Col>
              <Col xs={4} className="text-end">
                5,990,000₫
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={8}>Phí vận chuyển</Col>
              <Col xs={4} className="text-end">
                Miễn phí
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={8}>
                <strong>Tổng cộng</strong>
              </Col>
              <Col xs={4} className="text-end">
                <strong>VND 5,990,000₫</strong>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
