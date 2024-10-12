import React, { useEffect, useState } from 'react';
import { Category } from '../initialize/type';
import { fetchAllCategory } from './CategoryService';

const TestCategory: React.FC = () => {
  const [listCategory, setListCategory] = useState<Category[]>([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
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

  return (
    <div>
      {listCategory.map((category, index) => (
        <div key={index}>{category.categoryName}</div>
      ))}
    </div>
  );
};

export default TestCategory;