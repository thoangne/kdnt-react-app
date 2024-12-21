import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import './FillerProduct.scss';
import { Category, FilterObject } from "../initialize/type";
import { fetchAllCategory } from "../services/CategoryService";

interface FilterProductProps {
  handerChangeFilterObject: (filterObject: FilterObject) => void; // Hàm nhận vào một FilterObject
}

export const FilterProduct: React.FC<FilterProductProps> = ({ handerChangeFilterObject }) => {
  const [ListNameType] = useState<string[]>([
    "Danh mục", "Giá sản phẩm", "Màu sắc", "Kích thước"
  ]);
  const [filterObject, setFilterObject] = useState<FilterObject>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    "Danh mục": [],
    "Giá sản phẩm": [],
    "Màu sắc": [],
    "Kích thước": [],
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetchAllCategory();
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  // Function to get filter options based on the type
  const getFilterOptions = (type: string) => {
    switch (type) {
      case "Danh mục":
        return categories.map((category) => category.categoryName);
      case "Giá sản phẩm":
        return ["Dưới 500.000 VND", "500.000 - 1.000.000 VND", "1.000.000 - 1.500.000 VND", "1.500.000 - 5.000.000 VND", "Trên 5.000.000 VND"];
      case "Màu sắc":
        return ["Đỏ", "Xanh", "Vàng", "Đen", "Trắng"];
      case "Kích thước":
        return ["S", "M", "L", "XL"];
      default:
        return [];
    }
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (type: string, value: string, checked: boolean) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (checked) {
        // Add value if checked
        updatedFilters[type] = [...(updatedFilters[type] || []), value];

        setFilterObject(prev => {
          const newFilterObject: FilterObject = { ...prev };

          if (type === "Danh mục") {
            newFilterObject.subCategory = [...(newFilterObject.subCategory || []), value];
          }

          if (type === "Kích thước") {
            newFilterObject.size = [...(newFilterObject.size || []), value];
          }

          if (type === "Màu sắc") {
            newFilterObject.color = [...(newFilterObject.color || []), value];
          }

          if (type === "Giá sản phẩm") {
            // Khởi tạo nếu chưa có mảng
            if (!newFilterObject.minPrice) {
              newFilterObject.minPrice = [];
            }
            if (!newFilterObject.maxPrice) {
              newFilterObject.maxPrice = [];
            }
          
            // Thêm giá trị vào mảng tương ứng
            switch (value) {
              case "Dưới 500.000 VND":
                if (!newFilterObject.minPrice.includes(0)) {
                  newFilterObject.minPrice.push(0); // Thêm 0 vào mảng minPrice
                }
                if (!newFilterObject.maxPrice.includes(500000)) {
                  newFilterObject.maxPrice.push(500000); // Thêm 500000 vào mảng maxPrice
                }
                break;
              case "500.000 - 1.000.000 VND":
                if (!newFilterObject.minPrice.includes(500000)) {
                  newFilterObject.minPrice.push(500000);
                }
                if (!newFilterObject.maxPrice.includes(1000000)) {
                  newFilterObject.maxPrice.push(1000000);
                }
                break;
              case "1.000.000 - 1.500.000 VND":
                if (!newFilterObject.minPrice.includes(1000000)) {
                  newFilterObject.minPrice.push(1000000);
                }
                if (!newFilterObject.maxPrice.includes(1500000)) {
                  newFilterObject.maxPrice.push(1500000);
                }
                break;
              case "1.500.000 - 5.000.000 VND":
                if (!newFilterObject.minPrice.includes(1500000)) {
                  newFilterObject.minPrice.push(1500000);
                }
                if (!newFilterObject.maxPrice.includes(5000000)) {
                  newFilterObject.maxPrice.push(5000000);
                }
                break;
              case "Trên 5.000.000 VND":
                if (!newFilterObject.minPrice.includes(5000000)) {
                  newFilterObject.minPrice.push(5000000); // Thêm 5000000 vào mảng minPrice
                }
                if (!newFilterObject.maxPrice.includes(1000000000)) {
                  newFilterObject.maxPrice.push(1000000000); // Sử dụng Infinity để biểu thị không giới hạn
                }
                break;
              default:
                break;
            }
          }

          handerChangeFilterObject(newFilterObject); // Gọi hàm callback với filterObject mới
          return newFilterObject;
        });
      } else {
        // Remove value if unchecked
        updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
      }

      return updatedFilters;
    });
  };

  return (
    <Container className="filter-container">
      <Row>
        <Col xs={2}> 
          <div className="bo-loc">
            <FilterOutlined className="icon-filter" />
            <span>Bộ lọc</span>
          </div>
        </Col>
        <Col className="d-flex justify-content-between width-dropdown">
          {ListNameType.map((NameType, index) => (
            <div key={index} className="filter-dropdown">
              <Dropdown className="root-drop">
                <Dropdown.Toggle className="dropdown-custom" variant="success">
                  {NameType}
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu-dropdown">
                  {getFilterOptions(NameType).map((option, idx) => (
                    <Dropdown.Item key={idx} href="#/action-1">
                      <Form.Check
                        label={option}
                        name={NameType}
                        value={option}
                        className="mr-20 filter-dropdown"
                        checked={selectedFilters[NameType]?.includes(option)}
                        onChange={(e) =>
                          handleCheckboxChange(NameType, option, e.target.checked)
                        }
                      />    
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};
