import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Order } from "../initialize/type";
import { useUserContext } from "../context/UserContext";
import {cancelOrderAPI, fetchOrderByUserAndStatus } from "../services/OrderService";
import { openFailNotification, openSuccessNotification } from "../components/Notification";
import OrderDetailModal from "../Admin1/pages/orders/component/OrderDetailModal";
import "./MyOrders.scss";

const tabs = [
  { label: "Tất Cả", status: "ALL" },
  { label: "Chưa Xác Nhận", status: "PENDING" },
  { label: "Đang giao", status: "SHIPPING" },
  { label: "Đã giao", status: "DELIVERED" },
  { label: "Đã Hủy", status: "CANCELLED" }
];

const MyOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Tất Cả");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { myInfo } = useUserContext();

  const cancelOrder = async(orderId: string) => {
    const res = await cancelOrderAPI(orderId);
    if(res && res.data){
      openSuccessNotification("Hủy đơn hàng thành công", "")
    }else{
      openFailNotification("Hủy đơn hàng thất bại!", "");
    }
  }

  useEffect(() => {
    const fetchOrders = async (status: string) => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (status === "ALL") {
          // response = await fetchAllOrders();
        } else {
          if(myInfo){
            response = await fetchOrderByUserAndStatus(myInfo?.userId,status);
          }
          
        }

        if (response && response.data) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setError("Lỗi khi tải dữ liệu đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    const tabStatus = tabs.find(tab => tab.label === activeTab)?.status || "";
    fetchOrders(tabStatus);
  }, [activeTab]);

  const handleTabClick = (tabLabel: string) => {
    setActiveTab(tabLabel);
  };

  return (
    <div className="order-tracking">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`tab ${activeTab === tab.label ? "active" : ""}`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="orders-list">
        <h2>{activeTab}</h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          orders.map((order) => (
            <div key={order.orderId} className="order-item">
              <Row>
                <Col md={8}>
                  <p><strong>ID Đơn Hàng:</strong> {order.orderId}</p>
                  <p><strong>Địa Chỉ:</strong> {order.street}, {order.ward}, {order.district}, {order.province}</p>
                  <p><strong>Trạng Thái:</strong> {order.status}</p>
                </Col>
                <Col md={4}>
                  <p><strong>Ngày Đặt Hàng:</strong> {order.orderDate}</p>
                  <p><strong>Ngày Nhận Hàng:</strong> {order.receipDate? order.receipDate:"Chưa nhận hàng"}</p>
                </Col>
                <div className="see-more">
                  <p>
                    <OrderDetailModal orderDetail={order}></OrderDetailModal>
                  </p>
                  <p>
                    {(order.status === "CANCELLED" || order.status === "DELIVERED" || order.status === "SHIPPING") ? null: (
                      <button className="cancle-btn" onClick={async () => { await cancelOrder(order.orderId) }}>
                        Hủy đơn
                      </button>
                    )}
                  </p>
                   
                </div>
              </Row>
              {/* <OrderDetailModal orderDetail={order} /> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
