import React, { useState, useEffect } from 'react';
import Dropdown from 'react-multilevel-dropdown';
import "./DropdownNav.scss";
import { fetchAllCategory } from '../services/CategoryService';
import { Category } from '../initialize/type';

export const DropdownNav = ({ title }: { title: string }) => {
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const [listItem, setListItem] = useState<string[]>([
    "item1", "item2", "item3", "item4", "item5", "item6", "item7"
  ]);

  useEffect(() => {
    if (title === "Doanh mục") {
      getAllCategory();
    }
  }, [title]);

  const getAllCategory = async () => {
    try {
      const res = await fetchAllCategory();
      if (res && res.data && res.data.data) {
        setListCategory(res.data.data);
        console.log("Fetched categories:", res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleItemClick = (item: string) => {
    console.log("Item clicked:", item);
  };

  const handleSubItemClick = (subItem: string) => {
    console.log("Sub-item clicked:", subItem);
  };

  return (
    <div id="dropdown">
      {title === "Doanh mục" ? (
        <Dropdown title={title}>
          {listCategory.map((category, index) => (
            <Dropdown.Item key={index} onClick={() => handleItemClick(category.categoryName)}>
              {category.categoryName}
              {category.subCategory && category.subCategory.length > 0 && (
                <Dropdown.Submenu className='xxx'>
                  {category.subCategory.map((sub, subIndex) => (
                    <Dropdown.Item key={subIndex} onClick={() => handleSubItemClick(sub.name)}>
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
          {listItem.map((item, index) => (
            <Dropdown.Item key={index} onClick={() => handleItemClick(item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown>
      )}
    </div>
  );
};
