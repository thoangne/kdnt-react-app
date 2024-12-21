import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import RecentProduct from "./RecentProduct/RecentProduct";
import ProductInsertModel from "./component/modal/ProductInsertModel";
import SearchProductComponent from "../../../components/search/SearchProductComponent";

export default function Product() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  



  const handleEditProduct = (product: any) => {
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
        
        <div className="right-actions">
          <ProductInsertModel></ProductInsertModel>
        </div>
      </div>

      
      {/* <SearchProductComponent></SearchProductComponent> */}
     
      <div className="flex-row-fullwidth">
        <RecentProduct onEdit={handleEditProduct} />
      </div>

      {/* {showForm && <ProductForm product={editingProduct} onClose={handleCloseForm} />} */}
    </div>
  );
}
