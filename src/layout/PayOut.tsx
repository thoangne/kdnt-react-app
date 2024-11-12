import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import FormInput from "../components/Card/FormInput";
import "./PayOut.scss";
import { useUserContext } from "../context/UserContext";
import { fetchAllProvince, fetchDistrictsByProvinceId, fetchWardByDestrictId } from "../services/ProvinceService";
import { fetchShoppingCartByUser, LoadAllShoppingCart } from "../services/ShoppingCartService";
import { Order, OrderItem, ShoppingCart, User } from "../initialize/type";
import { orderDefautl } from "../initialize/defaultType";
import { createOrderAPI, createOrderItemAPI } from "../services/OrderService";
import { openFailNotification, openSuccessNotification } from "../components/Notification";

export const PayOut = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order>(orderDefautl);
  const [productCart, setProductCart] = useState<ShoppingCart[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [destricts, setDestricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectProvince, setSelectProvince] = useState<string | undefined>();
  const [selectDestrict, setSelectDestrict] = useState<string | undefined>();
  const [totalPrice, setTotalPrice] = useState<number | undefined>(0);
  const [shoppingCartItem, setShoppingCartItem] = useState<ShoppingCart[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const { myInfo } = useUserContext();
  const userInfo = myInfo as User;

  useEffect(() => {
    if (myInfo) {
      fetchShoppingCartByUser(myInfo.userId).then((res) => {
        setProductCart(res.data.productCartItem);
        setTotalPrice(res.data.totalPrice);
        setShoppingCartItem(res.data.productCartItem);
        setOrder((prevState) => ({ ...prevState, user: userInfo }));
      });
    }
  }, [myInfo, userInfo]);

  useEffect(() => {
    fetchAllProvince().then((res) => setProvinces(res.results));
  }, []);

  useEffect(() => {
    if (selectProvince) {
      fetchDistrictsByProvinceId(selectProvince).then((res) => setDestricts(res.results));
    }
  }, [selectProvince]);

  useEffect(() => {
    if (selectDestrict) {
      fetchWardByDestrictId(selectDestrict).then((res) => setWards(res.results));
    }
  }, [selectDestrict]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const value = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].dataset.code;
    
    setOrder((prevState) => ({
      ...prevState,
      [type]: selectedName || value,
    }));

    if (type === "province") setSelectProvince(value);
    if (type === "district") setSelectDestrict(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prevState) => ({ ...prevState, street: e.target.value }));
  };

  
  const addOrderItem = async (orderItem: OrderItem) => {
    try {
      return await createOrderItemAPI(orderItem);
    } catch (error) {
      console.error("Lỗi khi thêm OrderItem: ", error);
      throw error; // Ném lỗi để xử lý tiếp
    }
  };
  
  const OrderHandler = async () => {
    try {
      // Tạo đơn hàng trước
      const res = await createOrderAPI(order);
  
      if (res) {
        const createdOrder = res.data; // Đối tượng Order vừa tạo
        console.log("Order Created Successfully: ", createdOrder);
  
        // Thêm tất cả các OrderItem
        const itemsPromises = productCart.map((item: ShoppingCart) => 
          addOrderItem({
            quantity: item.quantity,
            specifications: item.specifications,
            order: createdOrder // Gán order hoặc orderId từ response
          })
        );
  
        // Chờ xử lý tất cả các OrderItems
        const createdItems = await Promise.all(itemsPromises);
  
        // Lưu trữ các mục đã thêm thành công
        setOrderItems((prevItems) => [...prevItems, ...createdItems]);
  
        openSuccessNotification("Mua hàng thành công", "");

        // window.location.reload();

      } else {
        openFailNotification("Mua hàng thất bại!", "Không thể tạo đơn hàng");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý đơn hàng: ", error);
      openFailNotification("Mua hàng thất bại!", "Lỗi khi gọi API mua hàng");
    }
  };
  
  
  
    

  return (
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
                <span>{myInfo?.firstName} {myInfo?.lastName}</span>
                <a href="">Đăng xuất</a>
              </div>
            </div>

            <FormInput controlid="" caption="" type="" placeholder="Họ" value={myInfo?.firstName} />
            <FormInput controlid="" caption="" type="" placeholder="Tên" value={myInfo?.lastName} />
            <FormInput controlid="" caption="" type="" placeholder="Số điện thoại" value="" />
            <FormInput controlid="" caption="" type="" placeholder="Địa chỉ" value={order.street} onChange={handleAddressChange} />

            <Form className="d-flex">
              <Form.Group controlId="customer_shipping_province">
                <Form.Label>Tỉnh/ Thành</Form.Label>
                <Form.Control as="select" onChange={(e) => handleSelectChange(e, "province")}>
                  <option value="null">Chọn tỉnh/ thành</option>
                  {provinces.map((province) => (
                    <option key={province.province_id} value={province.province_id} data-code={province.province_name}>
                      {province.province_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="customer_shipping_district">
                <Form.Label>Quận/ Huyện</Form.Label>
                <Form.Control as="select" onChange={(e) => handleSelectChange(e, "district")}>
                  <option value="null">Chọn quận/ huyện</option>
                  {destricts.map((destrict) => (
                    <option key={destrict.destrict_id} value={destrict.district_id} data-code={destrict.district_name}>
                      {destrict.district_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="customer_shipping_ward">
                <Form.Label>Phường/ Xã</Form.Label>
                <Form.Control as="select" onChange={(e) => handleSelectChange(e, "ward")}>
                  <option value="null">Chọn phường/ xã</option>
                  {wards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id} data-code={ward.ward_name}>
                      {ward.ward_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
          <h3>Phương thức vận chuyển</h3>
          <Form.Group className="custom-box-gr">
            <Form.Check
              className="custom-box-input"
              type="radio"
              label="Miễn phí giao hàng & lắp đặt tại tất cả quận huyện thuộc TP.HCM đối với các sản phẩm nội thất."
            />
          </Form.Group>

          <h3>Phương thức thanh toán</h3>
          <Form className="custom-box-gr">
            <Form.Check type="radio" label="Thanh toán bằng tiền mặt" name="paymentMethod" />
            <Form.Check type="radio" label="Thanh toán bằng chuyển khoản" name="paymentMethod" />
            <Form.Check type="radio" label="Thanh toán online qua cổng VNPay" name="paymentMethod" />
            <Form.Check type="radio" label="Ví MoMo" name="paymentMethod" />
          </Form>

          <div className="custom-subb">
            <Button onClick={OrderHandler}>Hoàn tất đơn hàng</Button>
          </div>
        </Col>
        <Col xs={5}>
          <LoadAllShoppingCart></LoadAllShoppingCart>

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
  );
};
