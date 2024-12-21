import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { fetchAllSubCategory } from './../../../services/SubCategoryService';
import { subCategory } from '../../../initialize/type';
import "./Dropdown.scss";

type SubCategorySelectProps = {
  onSubCategoryChange: (subCategoryId: number) => void, // Function to notify parent
  value: string | null
};

function SubCategorySelect({ onSubCategoryChange, value }: SubCategorySelectProps) {
  const [subCategories, setSubCategories] = useState<subCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | number>("");

  // Fetch subcategories from API when the component mounts
  useEffect(() => {
    const getAllSubCategories = async () => {
      try {
        const res = await fetchAllSubCategory();
        if (res && res.data) {
          setSubCategories(res.data);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    getAllSubCategories();
  }, []);

  // Handle selection change
  const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedSubCategory(selectedId); // Save the selected subcategory ID
    console.log("Selected Subcategory ID:", selectedId);
    onSubCategoryChange(selectedId); // Notify parent with selected ID
  };

  return (
    <Form.Select
      aria-label="Select a subcategory"
      value={selectedSubCategory}
      onChange={handleSubCategoryChange} // Add the onChange handler
    >
      <option disabled value="">{value? value: "chọn danh muc"}</option>
      {subCategories.map((subcategory) => (
        <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>
          {subcategory.name}
        </option>
      ))}
    </Form.Select>
  );
}

export default SubCategorySelect;
