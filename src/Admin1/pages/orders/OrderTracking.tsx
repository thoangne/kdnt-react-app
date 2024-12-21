import React, { useState, useEffect } from "react";
import './OrderTracking.scss';
import { Col, Row } from "react-bootstrap";
import OrderDetailModal from "./component/OrderDetailModal";
import { fetchOrderByStatus, fetchAllOrders } from "../../../services/OrderService";
import { Order } from "../../../initialize/type";

const tabs = [
  { label: "Tất Cả", status: "ALL" },
  { label: "Chưa Xác Nhận", status: "PENDING" },
  { label: "Đang giao", status: "SHIPPING" },
  { label: "Đã giao", status: "DELIVERED" },
  { label: "Đã Hủy", status: "CANCELLED" }
];

const OrderTracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Tất Cả");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async (status: string) => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (status === "ALL") {
          response = await fetchAllOrders();
        } else {
          response = await fetchOrderByStatus(status);
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
      <div className="tabs-container">
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
                  <p><strong>Ngày Nhận Hàng:</strong> {order.receipDate? order.receipDate : "Chưa nhận hàng"}</p>
                </Col>
              </Row>
              <OrderDetailModal orderDetail={order} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
