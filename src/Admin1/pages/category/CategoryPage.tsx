import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import SearchProductComponent from "../../../components/search/SearchProductComponent";
import RecentCategory from "./RecentCategory/RecentCategory";
import CategoryInsertModal from "./component/modal/CategoryInsertModel";

export default function CategoryPage() {
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
        <h1>Danh mục</h1>
        
        <div className="right-actions">
          <CategoryInsertModal></CategoryInsertModal>
        </div>
      </div>

    
     
      <div className="flex-row-fullwidth">
        <RecentCategory onEdit={handleEditProduct} />
      </div>

      {/* {showForm && <ProductForm product={editingProduct} onClose={handleCloseForm} />} */}
    </div>
  );
}
