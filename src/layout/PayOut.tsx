import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import FormInput from "../components/Card/FormInput";
import "./PayOut.scss";
import { useUserContext } from "../context/UserContext";
import { fetchAllProvince, fetchDistrictsByProvinceId, fetchWardByDestrictId } from "../services/ProvinceService";
import { fetchShoppingCartByUser, LoadAllShoppingCart } from "../services/ShoppingCartService";
import { Order, ShoppingCart, User } from "../initialize/type";
import { orderDefautl } from "../initialize/defaultType";

// interface Province {
//   province_id: string;
//   province_name: string;
//   province_type:
// }


export const PayOut = () => {
  // const {myInfo} = useUserContext();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order>(orderDefautl);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [destricts, setDestricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectProvince, setSelectProvince] = useState();
  const [selectDestrict, setSelectDestrict] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const [shoppingCartItem, setShoppingCartItem] = useState<ShoppingCart[]>([]);
  const { myInfo } = useUserContext();
  console.log(JSON.stringify(myInfo));
  // setOrder((prevState) => ({
  //   ...prevState,
  //   user: myInfo as User // Ép kiểu hoặc giữ nguyên user

  // }));
  
  
  useEffect(() => {
    const getItem = async () => {
      try {
        if (myInfo) {
          const res = await fetchShoppingCartByUser(myInfo.userId);
          if (res) {
            setTotalPrice(res.data.totalPrice);
            setShoppingCartItem(res.data.productCartItem); 
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getItem(); // Gọi hàm async
  }, [myInfo]); // Phụ thuộc vào myInfo thay vì ShoppingCartItem

  useEffect(() => {
    getAllProvince();
  }, [])

  useEffect(() => {
    if (selectProvince) {
      getAllDestrictByProvinceId(selectProvince);
    }
  }, [selectProvince]);

  useEffect(() => {
    if (selectDestrict) {
      getAllWardByDestrictId(selectDestrict);
    }
  }, [selectDestrict]);


  const addOrderHander = () => {
    
  }
  const getAllProvince = async() => {
    const res = await fetchAllProvince();
    setProvinces(res.results);
  }

  const getAllDestrictByProvinceId = async(provinceId: string) => {
    const res = await fetchDistrictsByProvinceId(provinceId);
    setDestricts(res.results);
  }

  const getAllWardByDestrictId = async(destrictId: string) => {
    const res = await fetchWardByDestrictId(destrictId);
    setWards(res.results);
  }

  const handleSelectProvinceChange = (e: any) => {
    setSelectProvince(e.target.value);
    const selectedName = e.target.options[e.target.selectedIndex].dataset.code; // Lấy tên tỉnh từ data-code
    
    setOrder(prevState => ({
      ...prevState,
      province: selectedName || undefined, // Cập nhật province_name
    }));
  }

  const handleSelectDestrictChange = (e: any) => {
    setSelectDestrict(e.target.value);
    const selectedName = e.target.options[e.target.selectedIndex].dataset.code;
    setOrder(prevState => ({
      ...prevState,
      district: selectedName || undefined, // Cập nhật province_name
    }));
  }

  const handleSelectWardChange = (e: any) => {
    setSelectDestrict(e.target.value);
    const selectedName = e.target.options[e.target.selectedIndex].dataset.code;
    setOrder(prevState => ({
      ...prevState,
      ward: selectedName || undefined, // Cập nhật province_name
    }));
  }

  const handleSelectAddressChange = (e: any) => {
    const value = e.target.value;
    setOrder(prevState => ({
      ...prevState,
      street: value || undefined, // Cập nhật province_name
    }));
  }

  console.log(" yyyyyyy " + JSON.stringify(order));
  // console.log("xxxxxxxxx " + JSON.stringify(provinces));


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
                  value={myInfo?.firstName}
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
                  value={myInfo?.lastName}
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
                  value={order.street}
                  onChange={handleSelectAddressChange}
                ></FormInput>

                <Form className="d-flex">
                  {/* Province/City Selection */}
                  <Form.Group controlId="customer_shipping_province">
                    <Form.Label>Tỉnh/ Thành</Form.Label>
                    <Form.Control onChange={handleSelectProvinceChange}
                      as="select"
                      name="customer_shipping_province"
                      defaultValue="null"
                    >
                      <option data-code="null" value="null">
                        Chọn tỉnh/ thành
                      </option>
                      
                      {provinces && provinces.map((province) => (
                        <option 
                          key={province.province_id} 
                          data-code={province.province_name}
                          value={province.province_id}
                        >
                          
                          {province.province_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  {/* District Selection */}
                  <Form.Group controlId="customer_shipping_district">
                    <Form.Label>Quận/ Huyện</Form.Label>
                    <Form.Control onChange={handleSelectDestrictChange}
                      as="select"
                      name="customer_shipping_district"
                      defaultValue="null"
                    >
                      <option data-code="null" value="null">
                        Chọn quận/ huyện
                      </option>
                      {destricts && destricts.map((destrict) => (
                         <option 
                         key={destrict.destrict_id} 
                         data-code={destrict.district_name}
                         value={destrict.district_id}
                       >
                         {destrict.district_name}
                       </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  {/* Ward Selection */}
                  <Form.Group controlId="customer_shipping_ward">
                    <Form.Label>Phường/ Xã</Form.Label>
                    <Form.Control onChange={handleSelectWardChange}
                      as="select"
                      name="customer_shipping_ward"
                      defaultValue="null"
                    >
                      <option data-code="null" value="null">
                        Chọn phường/ xã
                      </option>
                      {wards && wards.map((ward) => (
                         <option 
                         key={ward.ward_id} 
                         data-code={ward.ward_name}
                         value={ward.ward_id}
                       >
                         {ward.ward_name}
                       </option>
                      ))}
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
          <LoadAllShoppingCart></LoadAllShoppingCart>
            {/* <Card className="mb-3">
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
            </Card> */}

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
                {/* {shoppingCartItem.price} */}
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
                <strong>{totalPrice}</strong>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
