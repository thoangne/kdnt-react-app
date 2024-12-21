import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { Promotion } from "../../../initialize/type";
import { fetchAllPromotionAPI } from "../../../services/PromotionService";
import "./OnPromotion.scss";
import PromotionInsertModal from "./PromotionInsertModal";
import PromotionUpdateModal from "./PromotionUpdateModal";


interface OnPromotionProps {
  onEdit?: (promotion: Promotion) => void; // Thêm onEdit nếu cần chỉnh sửa
}

const OnPromotion: React.FC<OnPromotionProps> = ({ onEdit }) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading

  useEffect(() => {
    const getAllPromotion = async () => {
      try {
        const res = await fetchAllPromotionAPI();
        setPromotions(res.data); // Đảm bảo res.data là mảng Promotion
      } catch (error) {
        console.error("Lỗi khi tải danh sách khuyến mãi:", error);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    getAllPromotion();
  }, []);

  return (
    <div>
      <div>
        <div className="promotion-header">
          <h2>Danh sách khuyến mãi</h2>
          <PromotionInsertModal></PromotionInsertModal>
        </div>
        
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
            <div className="table-container"> 
          <table>
            <thead className="promotion-thead">
              <tr>
                <th>Promotion ID</th>
                <th>Code</th>
                <th>Số tiền tối đa</th>
                <th>Phần trăm (%)</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày cập nhật</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion.promotionId}>
                  <td>{promotion.promotionId}</td>
                  <td>
                  <Link
                    to={{
                      pathname: `/admin/promotion-detail/${promotion.promotionId}`,
                    }}
                    state={{ promotion }}
                  >
                    {promotion.promotionCode}
                  </Link>

                  </td>
                  <td>{promotion.discountAmount || "N/A"}</td>
                  <td>{promotion.discountPercentage + "%" || "N/A"}</td>
                  <td>{promotion.startDate || "N/A"}</td>
                  <td>{promotion.startDate || "N/A"}</td>
                  <td>
                    {promotion.status ? (
                      <span className="active">Đang hoạt động</span>
                    ) : (
                      <span className="inactive">Không hoạt động</span>
                    )}
                  </td>
                  <td><PromotionUpdateModal promotionProp={promotion} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnPromotion;
