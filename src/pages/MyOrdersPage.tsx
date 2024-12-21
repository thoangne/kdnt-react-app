import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import FormInput from "../components/Card/FormInput";
import { User } from "../initialize/type";
import { UserDefault } from "../initialize/defaultType";
import { useUserContext } from "../context/UserContext";
import { UpdateUserInfoAPI } from "../services/UserService";
import OrderTracking from "../Admin1/pages/orders/OrderTracking";
import Sidebar from "../layout/SideBar";
import Header from "../layout/Header";
import MyOrders from "../layout/MyOrders";

const MyOrdersPage: React.FC = () => {
  const { myInfo } = useUserContext();
  const [UserInfo, setUserInfo] = useState<User>(UserDefault);
  const [error, setError] = useState<string>("");

  // Initialize UserInfo with myInfo data on component mount
  useEffect(() => {
    if (myInfo) {
      setUserInfo(myInfo);
    }
  }, [myInfo]);





  return (
    <>
        <Header />
    
        <div className="account-form-container">
            <span className="cap-info">Đơn hàng của bạn</span>
        <Row>
            <Col xs={3}>
            <Sidebar></Sidebar>
            </Col>
            <Col xs={9}>
            <h2>Thông tin đơn hàng</h2>
                <MyOrders></MyOrders>
            </Col>
        </Row>
        </div>
        </>
  );
};

export default MyOrdersPage;
