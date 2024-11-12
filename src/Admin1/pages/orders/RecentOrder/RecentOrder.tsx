import React from "react";
// import { orderData } from "./data";  // Đảm bảo orderData được khai báo với kiểu phù hợp
import "./RecentOrder.css";

// Định nghĩa kiểu dữ liệu cho một đơn hàng
interface Order {
  id: number;
  customer: string;
  date: string;
  status: string;
  statusColor: string;
  total: string;
  payment: boolean;
  action: string;
}

// Đảm bảo rằng orderData là một mảng các đối tượng Order
const orderData: Order[] = [
  // Ví dụ dữ liệu mẫu
  {
    id: 1,
    customer: "Nguyễn Văn A",
    date: "2024-11-10",
    status: "Đang xử lý",
    statusColor: "pending",
    total: "500.000 VND",
    payment: true,
    action: "Xem"
  },
  {
    id: 2,
    customer: "Trần Thị B",
    date: "2024-11-09",
    status: "Đã giao",
    statusColor: "completed",
    total: "750.000 VND",
    payment: false,
    action: "Chi tiết"
  },
  // Thêm dữ liệu ví dụ ở đây
];

const RecentOrder: React.FC = () => {
  return (
    <div className="custom-card">
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr>
              <th>THÔNG TIN ĐƠN HÀNG</th>
              <th>NGÀY TẠO</th>
              <th>TRẠNG THÁI</th>
              <th>TỔNG TIỀN</th>
              <th>THANH TOÁN</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr key={order.id}>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`status ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.total}</td>
                <td>
                  <input type="checkbox" checked={order.payment} readOnly />
                </td>
                <td>
                  <button className="action-button">{order.action}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrder;
