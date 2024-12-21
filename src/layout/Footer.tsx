import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-4 footer-container">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Nội Thất MOHO</h5>
            <p>
              Nội Thất MOHO là thương hiệu đến từ Savimex với gần 40 năm kinh nghiệm trong việc sản xuất và xuất khẩu nội thất đạt chuẩn quốc tế.
            </p>
          </Col>
          <Col md={4}>
            <h5>Liên hệ</h5>
            <p>Showroom: 162 HT17, P. Hiệp Thành, Q. 12, TP. HCM</p>
            <p>Hotline: 0971 141 140</p>
            <p>Email: cskh@moho.com.vn</p>
          </Col>
          <Col md={4}>
            <h5>Mạng xã hội</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com" className="text-white">Fanpage</a>
              </li>
              <li>
                <a href="https://www.instagram.com" className="text-white">Instagram</a>
              </li>
              <li>
                <a href="https://www.tiktok.com" className="text-white">Tiktok</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12} className="text-center">
            <p className="mb-0">© 2024 Công Ty Cổ Phần Hợp Tác Kinh Tế Và Xuất Nhập Khẩu Savimex</p>
            <p className="mb-0">STK: 0071001303667 - Vietcombank CN HCM</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
