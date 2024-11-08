import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import Purchase from './components/Purchase';
import './AdminPage.scss'
import AddProduct from './components/AddProduct';
import Product from './components/Product';
function AdminPage() {
  return (
    <Container fluid>
      <Row>
        <Col md={3} className="sidebar">
          <h2>Admin Panel</h2>
          <Accordion defaultActiveKey="0" className="mt-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Dashboard</Accordion.Header>
              <Accordion.Body>
                <Link to="/admin/purchase" className="nav-link">Trang chủ</Link>
                <Link to="analytics" className="nav-link">Phân tích</Link>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Quản lí nhân viên</Accordion.Header>
              <Accordion.Body>
                <Link to="users" className="nav-link">Nhân viên</Link>
                <Link to="roles" className="nav-link">Vai trò</Link>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Quản lí dơn hàng</Accordion.Header>
              <Accordion.Body>
                <Link to="purchase" className="nav-link">Tất cả</Link>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Quản lí sản phẩm</Accordion.Header>
              <Accordion.Body>
                <Link to="product" className="nav-link">Sản phẩm</Link>
                <Link to="addproduct" className="nav-link">Thêm sản phẩm</Link>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Quản lí Khách hàng</Accordion.Header>
              <Accordion.Body>
                <Link to="customer" className="nav-link">Tất cả khách hàng</Link>
                <Link to="rate" className="nav-link">Xếp hạng </Link>
              </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </Col>

        <Col md={9} className="content">
          <Routes>
            {/* <Route path="overview" element={<Overview />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<Users />} />
            <Route path="roles" element={<Roles />} />
            <Route path="general" element={<General />} />
            <Route path="security" element={<Security />} /> */}
            <Route path="purchase" element={<Purchase />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="product" element={<Product />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
