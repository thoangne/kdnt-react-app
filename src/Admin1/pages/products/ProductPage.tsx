import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { HiOutlineSearch } from "react-icons/hi";
import RecentProduct from "./RecentProduct/RecentProduct";
import ProductInsertModel from "./ProductInsertModel";

export default function Product() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="header-container">
        <h1>Sản Phẩm</h1>
        <ProductInsertModel></ProductInsertModel>
        <div className="right-actions">
          <span>Xuất file</span>
        </div>
      </div>

      <div className="relative">
        <HiOutlineSearch fontSize={20} className="icon" />
        <input type="text" placeholder="Tìm kiếm..." className="custom-input" />
        <select className="dropdown-filter">
          <option value="">Danh mục</option>
        </select>
      </div>
     
      <div className="flex-row-fullwidth">
        <RecentProduct onEdit={handleEditProduct} />
      </div>

      {/* {showForm && <ProductForm product={editingProduct} onClose={handleCloseForm} />} */}
    </div>
  );
}
