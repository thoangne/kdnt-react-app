import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {deleteCategoryById, fetchAllCategory } from "../../../../services/CategoryService";
import { Category } from "../../../../initialize/type";
import { openFailNotification, openSuccessNotification } from "../../../../components/Notification";
import { confirm } from "../../../components/common/confirm/confirm";
import { FaTrash } from "react-icons/fa";
import CategoryUpdateModal from "../component/modal/CategoryUpdateModal";
import "./RecentCategory.scss";
import { deleteProductAPI } from "../../../../services/ProductService";

function RecentCategory({ onEdit }) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchAllCategory();
        setCategories(response.data);
      } catch (error) {
        openFailNotification("Failed to fetch categories", error.message);
      }
    };

    loadCategories();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await deleteCategoryById(id);
      if (response) {
        openSuccessNotification("Xóa danh mục thành công", "");
        setCategories(categories.filter(category => category.categoryId !== id));
      } else {
        openFailNotification("Xóa danh mục thất bại", "");
      }
    } catch (error) {
      openFailNotification("Lỗi khi xóa danh mục", error.message);
    }
  };

  const handleConfirm = async (id: string) => {
    if (await confirm({ confirmation: `Bạn có chắc là muốn xóa mã sản phẩm ${id}?` })) {
      handleDeleteProduct(id);
    }
  };

  return (
    <Container className="category-container">
      <div className="category-table-container">
        <table>
          <thead className="category-menu">
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Banner</th>
              <th>Tên danh mục</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.categoryName}</td>
                <td>{category.categoryName}</td>
                <td>{category.categoryName}</td>
                <td className="button">
                  <CategoryUpdateModal category={category} />
                  <button className="delete-button" onClick={() => handleConfirm(category.categoryId)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default RecentCategory;
