import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import logo from "../assets/logo.png";
import "./Header_style.scss";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CarouselForm from "./CarouselForm";

function Header() {
  return (
    <Navbar id="header" bg="light" expand="lg" className="d-block">
      <div id="header-top">
        <span id="header-top__text">
          Nội Thất MOHO miễn phí giao hàng & lắp đặt tại TP.HCM, Hà Nội, Biên
          Hòa và một số khu vực tại Bình Dương
        </span>
      </div>

      <Container className="mt-20" fluid="md">
  <Row className="align-items-center g-0 full-row"> {/* Sử dụng g-0 để xóa khoảng cách */}
    <Col xs={2} className="text-center text-md-start">
      <Navbar.Brand id="header-bottom__logo" href="#">
        <img
          id="header-bottom__logo-icon"
          src={logo}
          alt="Logo"
          height="40"
        />
      </Navbar.Brand>
    </Col>

    <Col xs={4} className="d-flex justify-content-center">
      <Form id="header-bottom__form" className="d-flex w-100">
        <FormControl
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          className="me-2 flex-grow-1"
          aria-label="Search"
        />
        <Button id="header-bottom__form-btn" variant="outline-success">
          Search
        </Button>
      </Form>
    </Col>

    <Col xs={6} className="d-flex justify-content-end align-items-center ">
      <Button
        variant="outline-primary"
        className="header-bottom__container-btn me-3"
      >
        3D HOUSE
      </Button>

      <div
        id="header-bottom__container-account"
        className="d-flex align-items-center me-3"
      >
        <UserOutlined className="icon-user" />
        <div id="header-bottom__container-account-access" className="ms-2 mr-10">
          <span className="d-block">Đăng nhập/Đăng ký</span>
          <span className="d-block">Tài khoản của tôi</span>
        </div>
      </div>

      <div
        id="header-bottom__container-cart"
        className="d-flex align-items-center me-3 mr-10"
      >
        <ShoppingCartOutlined className="icon-user" />
      </div>

      <div className="mr-10" id="header-bottom__container-cart-heart">
        <HeartOutlined className="icon-user" />
      </div>
    </Col>
  </Row>
</Container>
  <CarouselForm />
</Navbar>
    // <Navbar id="header" bg="light" expand="lg" className="d-block">
    //   <div id="header-top">
    //     <span id="header-top__text">
    //       Nội Thất MOHO miễn phí giao hàng & lắp đặt tại TP.HCM, Hà Nội, Biên
    //       Hòa và một số khu vực tại Bình Dương
    //     </span>
    //   </div>
    //   <div id="header-bottom">
    //     <Navbar.Brand id="header-bottom__logo" href="#">
    //       <img
    //         id="header-bottom__logo-icon"
    //         src={logo}
    //         alt="Logo"
    //         height="40"
    //       />
    //     </Navbar.Brand>

    //     <Form id="header-bottom__form" className="d-flex ">
    //       <FormControl
    //         type="search"
    //         placeholder="Search"
    //         className="me-2"
    //         aria-label="Search"
    //       />
    //       <Button id="header-bottom__form-btn" variant="outline-success">
    //         Search
    //       </Button>
    //     </Form>

    //     <div
    //       id="header-bottom__container"
    //       className="d-flex align-items-center"
    //     >
    //       <Button
    //         id="header-bottom__container-btn"
    //         variant="outline-primary"
    //         className="me-3"
    //       >
    //         3D HOUSE
    //       </Button>

    //       <div
    //         id="header-bottom__container-account"
    //         className="d-flex align-items-center me-3"
    //       >
    //         <UserOutlined />
    //         <div id="header-bottom__container-account-access">
    //           <span
    //             id="header-bottom__container-account-access-text"
    //             className="d-block"
    //           >
    //             Đăng nhập/Đăng kí
    //           </span>
    //           <span
    //             id="header-bottom__container-account-access-text"
    //             className="d-block"
    //           >
    //             Tài khoản của tôi
    //           </span>
    //         </div>
    //       </div>

    //       <div
    //         id="header-bottom__container-cart"
    //         className="d-flex align-items-center me-3"
    //       >
    //        <ShoppingCartOutlined />
    //       </div>

    //       <div id="header-bottom__container-cart-heart">
    //       <HeartOutlined />
    //                 </div>
    //     </div>
    //   </div>
    //   <Container>
    //     <ul id="header-list__nav" className="header-list__list d-flex">
    //       <li className="header-list__list-item">
    //         <DropdownNav category="Sản phẩm"></DropdownNav>
    //       </li>
    //       <li className="header-list__list-item">
    //         <DropdownNav category="Sản phẩm"></DropdownNav>
    //       </li>
    //       <li className="header-list__list-item">
    //         <DropdownNav category="Sản phẩm"></DropdownNav>
    //       </li>
    //       <li className="header-list__list-item">
    //         <DropdownNav category="Sản phẩm"></DropdownNav>
    //       </li>
    //       <li className="header-list__list-item">
    //         <DropdownNav category="Sản phẩm"></DropdownNav>
    //       </li>
    //       <li className="header-list__list-item">
    //         <DropdownNav category="Sản phẩm"></DropdownNav>
    //       </li>
    //       <li className="header-list__list-item">
    //         <DropdownNav category="Sản phẩm"></DropdownNav>
    //       </li>
    //       <li className="header-list__list-item">
    //         <DropdownNav category="Sản phẩm"></DropdownNav>
    //       </li>
    //     </ul>
    //   </Container>
    // </Navbar>
  );
}

export default Header;
