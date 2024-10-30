import React, { useState, useEffect } from 'react';
import Dropdown from 'react-multilevel-dropdown';
import { useNavigate } from 'react-router-dom';
import "./DropdownNav.scss";
import { fetchAllCategory } from '../services/CategoryService';
import { Category } from '../initialize/type';

export const DropdownNav = ({ title }: { title: string }) => {
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (title === "Doanh mục") {
      getAllCategory();
    }
  }, [title]);

  const getAllCategory = async () => {
    try {
      const res = await fetchAllCategory();
      if (res && res.data) {
        setListCategory(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Điều hướng khi nhấn vào Category
  const handleItemClick = (categoryName: string, categoryId: string) => {
    console.log("Category clicked:", categoryName);
    const formattedCategory = formatCategoryToUrl(categoryName);
    navigate(`/collections/${formattedCategory}/${categoryId}`);
  };

  // Điều hướng khi nhấn vào Subcategory
  const handleSubItemClick = (subCategoryName: string, subCategoryId: string) => {
    console.log("Sub-item clicked:", subCategoryName);
    const formattedSubCategory = formatCategoryToUrl(subCategoryName);
    navigate(`/collections/${formattedSubCategory}/${subCategoryId}`);
  };

  // Hàm để định dạng tên thành URL hợp lệ
  const formatCategoryToUrl = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu tiếng Việt
      .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu "-"
      .replace(/[^a-z0-9-]/g, ''); // Loại bỏ ký tự không hợp lệ
  };

  return (
    <div id="dropdown">
      {title === "Doanh mục" ? (
        <Dropdown title={title}>
          {listCategory.map((category) => (
            <Dropdown.Item
              key={category.categoryId}
              onClick={() => handleItemClick(category.categoryName, category.categoryId)}
            >
              {category.categoryName}
              {category.subCategory && category.subCategory.length > 0 && (
                <Dropdown.Submenu className='xxx'>
                  {category.subCategory.map((sub) => (
                    <Dropdown.Item
                      key={sub.id}
                      onClick={() => handleSubItemClick(sub.name, sub.id)}
                    >
                      {sub.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Submenu>
              )}
            </Dropdown.Item>
          ))}
        </Dropdown>
      ) : (
        <Dropdown title={title}>
          {/* Sử dụng listItem nếu không phải là "Doanh mục" */}
        </Dropdown>
      )}
    </div>
  );
};
