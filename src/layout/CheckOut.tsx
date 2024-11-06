import { Col, Container, Row } from "react-bootstrap";
import "./CheckOut.scss";
import ShoppingCartCard from "../components/Card/ProductCartCard";
import { useEffect, useState } from "react";
import { ShoppingCart } from "../initialize/type";
import { fetchShoppingCartByUser, LoadAllShoppingCart } from "../services/ShoppingCartService";
import { useUserContext } from "../context/UserContext";
import { downloadFileS3 } from "../services/StorageService";
import { Link, useNavigate } from "react-router-dom";
import { openFailNotification } from "../components/Notification";

export const CheckOut = () => {
  const [shoppingCartItem, setShoppingCartItem] = useState<ShoppingCart[]>([]);
  const { myInfo } = useUserContext();
  const navigate = useNavigate();
  
  const PaymentHander = () => {
    
    if(myInfo){
      navigate("/payout");
    }else{
      openFailNotification("Vui lòng đăng nhập để tiến hành thành toán!", "");
    }
  }

  useEffect(() => {
    const getItem = async () => {
      try {
        if (myInfo) {
          const res = await fetchShoppingCartByUser(myInfo.userId);
          if (res) {
            setShoppingCartItem(res.data.productCartItem); 
          }
        }
      } catch (err) {
        setError("Không thể tải giỏ hàng. Vui lòng thử lại sau."); // Xử lý lỗi
        console.error(err);
      }
    };
    getItem(); // Gọi hàm async
  }, [myInfo]); // Phụ thuộc vào myInfo thay vì ShoppingCartItem

  return (
    <Container>
      <h1 className="name-cart">Giỏ hàng của bạn</h1>
      <Row>
        <Col xs={8}>
          <LoadAllShoppingCart></LoadAllShoppingCart>
        </Col>
        <Col xs={4}>
          <h3>Thông tin đơn hàng</h3>
          <h3>Tổng tiền</h3>
          <h3 className="hellll">
            {shoppingCartItem.reduce((total, item) => total + item.specifications?.price, 0).toLocaleString("vi-VN")} VND
          </h3> {/* Tính tổng tiền */}
          {/* <Link to={"/payout"}><button className="btn-checkout">Thanh toán</button></Link> */}

          <button className="btn-checkout"  onClick={PaymentHander}>Thanh toán</button>
          
        </Col>
      </Row>
    </Container>
  );
};
