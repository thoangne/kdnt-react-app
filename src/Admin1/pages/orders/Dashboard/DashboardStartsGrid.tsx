import React from "react";
import "./db.css";
import { AiOutlineClockCircle, AiOutlineSync, AiOutlineRollback, AiOutlineCloseCircle } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";

const DashboardStartsGrid: React.FC = () => {
  return (
    <div className="flex-gap-4">
      <div className="combined-class">
        <div className="custom-circle">
          <AiOutlineClockCircle className="font" /> {/* Đang chờ xác nhận */}
        </div>
        <div className="pl-4">
          <strong className="custom-text-strong">0</strong>
          <div className="flex items-center">
            <span className="custom-subtext">Đang chờ xác nhận</span>
          </div>
        </div>
      </div>

      <div className="combined-class">
        <div className="custom-circle">
          <AiOutlineSync className="font" /> {/* Đang xử lý */}
        </div>
        <div className="pl-4">
          <strong className="custom-text-strong">5</strong>
          <div className="flex items-center">
            <span className="custom-subtext">Đang xử lý</span>
          </div>
        </div>
      </div>

      <div className="combined-class">
        <div className="custom-circle">
          <FaShippingFast className="font" /> {/* Đã giao */}
        </div>
        <div className="pl-4">
          <strong className="custom-text-strong">1</strong>
          <div className="flex items-center">
            <span className="custom-subtext">Đã giao</span>
          </div>
        </div>
      </div>

      <div className="combined-class">
        <div className="custom-circle">
          <AiOutlineRollback className="font" /> {/* Trả hàng */}
        </div>
        <div className="pl-4">
          <strong className="custom-text-strong">19</strong>
          <div className="flex items-center">
            <span className="custom-subtext">Trả hàng</span>
          </div>
        </div>
      </div>

      <div className="combined-class">
        <div className="custom-circle">
          <AiOutlineCloseCircle className="font" /> {/* Đã hủy */}
        </div>
        <div className="pl-4">
          <strong className="custom-text-strong">2</strong>
          <div className="flex items-center">
            <span className="custom-subtext">Đã hủy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStartsGrid;
