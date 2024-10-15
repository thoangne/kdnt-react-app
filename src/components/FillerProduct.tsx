import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import './FillerProduct.scss'
import { FilerObject } from "../initialize/type";

export const FillerProduct = () => {
    const [ListFilter, setListFilter] = useState<FilerObject[]>([]);
  const [ListNameType, setListNameType] = useState<string[]>([
    "Danh mục", "Gía sản phẩm", "Màu sắc", "Kích thước"
  ]); 
  return (
    <>
      <Container>
        <Row>
          <Col xs={2}> 
            <div className="bo-loc">
              <FilterOutlined className="icon-filter"></FilterOutlined>
              <span>Bộ lọc</span>
            </div>
          </Col>
          <Col className="d-flex justify-content-between width-dropdown">
          {ListNameType.map((NameType, index) => (
            <div>
              <Dropdown className="root-drop" >
                <Dropdown.Toggle className="dropdown-custom" variant="success">
                   {NameType}
                </Dropdown.Toggle>

                 {ListFilter.map((category,index)=>(
                <Dropdown.Menu className="menu-dropdown"> 
                  <Dropdown.Item href="#/action-1">
                  <Form.Check
                  label={category.subCategory}
                  name=""
                  value=""
                  className="mr-20"
                  />    
                  </Dropdown.Item>
                </Dropdown.Menu>                    
                 ))}   

              </Dropdown>
            </div>
                ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};
