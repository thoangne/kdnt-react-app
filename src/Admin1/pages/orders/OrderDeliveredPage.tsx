import React from "react";
import { Link } from "react-router-dom";
import "./Order.css";
import { HiOutlineSearch } from "react-icons/hi";
import RecentOrder from "./RecentOrder/RecentOrder";
import DashboardStartsGrid from "./Dashboard/DashboardStartsGrid";

export default function Product() {
  return (
    <div>
      <div className="header-container">
        <h1>Đơn Hàng</h1>
        <div className="right-actions">
          <span>TẠO ĐƠN HÀNG</span>
          <span>Xuất file</span>
        </div>
      </div>

      <div>
        <DashboardStartsGrid />
      </div>

      <div className="relative">
        <HiOutlineSearch fontSize={20} className="icon" />
        <input type="text" placeholder="Tìm kiếm..." className="custom-input" />
        <input type="date" className="date-filter" />
      </div>

      <div className="flex-row-fullwidth">
        <RecentOrder />
      </div>
    </div>
  );
}
