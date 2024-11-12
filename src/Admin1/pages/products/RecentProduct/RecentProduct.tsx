import React from "react";
import { recentOrderData } from "./data";
import "./RO.css";

function RecentProduct({ onEdit }) {
  const handleDeleteProduct = (id) => {
    // Thêm logic xóa sản phẩm tại đây, ví dụ như gọi API xóa và cập nhật lại danh sách sản phẩm
    console.log("Deleted product ID:", id);
  };

  return (
    <div className="custom-card">
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr>
              <td>ID</td>
              <td>SẢN PHẨM</td>
              <td>ĐƠN VỊ</td>
              <td>GIÁ VỐN</td>
              <td>GIÁ BÁN</td>
              <td>CÓ THỂ BÁN</td>
              <td>THAO TÁC</td>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
              <tr key={order.id_SKU}>
                <td>{order.id_SKU}</td>
                <td>{order.product_name}</td>
                <td>{order.don_vi}</td>
                <td>{order.gia_von}</td>
                <td>{order.gia_ban}</td>
                <td>{order.co_the_ban}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(order)}>Sửa</button>
                  <button className="delete-button" onClick={() => handleDeleteProduct(order.id_SKU)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentProduct;
