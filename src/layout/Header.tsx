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

import { DropdownNav } from "../components/DropdownNav";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import { LogoutAPI } from "../services/AuthorService";
import { getToken } from "../services/TokenService";
import { SearchProductComponent } from "../components/SearchProductComponent";
function Header() {
  const { myInfo } = useUserContext();
  const Logout = async() => {
    const token = await getToken();
    if (token) {
      await LogoutAPI(token); // Gọi API logout với token
      window.location.reload(); // Reload trang sau khi logout thành công
    } else {
      console.error("Không tìm thấy token");
    }
  }
  return (
    <Navbar id="header" bg="light" expand="lg" className="d-block">
      <div id="header-top">
        <span id="header-top__text">
          Nội Thất MOHO miễn phí giao hàng & lắp đặt tại TP.HCM, Hà Nội, Biên
          Hòa và một số khu vực tại Bình Dương
        </span>
      </div>

      <Container className="mt-20" fluid="md">
        <Row className="align-items-center g-0 full-row">
          {" "}
          {/* Sử dụng g-0 để xóa khoảng cách */}
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
          <SearchProductComponent></SearchProductComponent>
            {/* <Form id="header-bottom__form" className="d-flex w-100">
              <FormControl
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="me-2 flex-grow-1"
                aria-label="Search"
              />
              <Button id="header-bottom__form-btn" variant="outline-success">
                Search
              </Button>
            </Form> */}
          </Col>
          <Col
            xs={6}
            className="d-flex justify-content-end align-items-center "
          >
            <Button
              variant="outline-primary"
              className="header-bottom__container-btn me-3"
            >
              3D HOUSE
            </Button>

            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-cust"
                className="d-flex align-items-center me-3"
              >
                <div
                  id="header-bottom__container-account"
                  className="d-flex align-items-center me-3"
                >
                  <UserOutlined className="icon-user" />
                  <div
                    id="header-bottom__container-account-access"
                    className="ms-2 mr-10"
                  >
                    {myInfo? ( <div className="d-block text-under">Chào, {myInfo.firstName}</div>): (<div>
                        <span className="d-block text-under">
                          Đăng nhập/Đăng ký
                        </span>
                        <span className="d-block text-under">
                          Tài khoản của tôi
                        </span>
                      </div>)}
                    
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="w-menu">
                    {myInfo ? (
                      <Container>
                        <div className="text-cust">THÔNG TIN TÀI KHOẢN</div>
                          <Link className="text-under" to="/">
                            <div className="t-under-name">{myInfo.firstName + " " + myInfo.lastName}</div>
                          </Link>
                          <Link className="text-under" to="/my-info">
                            <div className="t-under-name">Tài khoản của bạn</div>
                          </Link>
                            <Link className="text-under" to="/">
                              <span className="t-under-name">Danh sách địa chỉ</span>
                            </Link>
                          <div>
                            <Link className="text-under" to="/">
                              <Button onClick={Logout}>Đăng xuất</Button>
                            </Link>
                          </div>

                      </Container>
                    ) : (
                      <Container>
                        <Link className="text-under" to="/login">
                          <Button className="custom-btn-login login" variant="primary">
                            Đăng nhập
                          </Button>
                        </Link>
                        <Link className="text-under" to="/register">
                          <Button className="custom-btn-login reg" variant="primary">
                            Đăng kí
                          </Button>
                        </Link>
                      </Container>
                    )}
                  </Dropdown.Menu>

            </Dropdown>

            <div
              id="header-bottom__container-cart"
              className="d-flex align-items-center me-3 mr-10"
            >
              <Link to="test"><ShoppingCartOutlined className="icon-user" /></Link>
              
            </div>

            <div className="mr-10" id="header-bottom__container-cart-heart">
              <HeartOutlined className="icon-user" />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="d-flex justify-content-center">
        <ul
          id="header-list__nav"
          className="header-list__list d-flex align-self-end"
        >
          <li className="header-list__list-item">
            <DropdownNav title="Doanh mục"></DropdownNav>
          </li>
          <li className="header-list__list-item">
            <DropdownNav title="Sản phẩm"></DropdownNav>
          </li>
          <li className="header-list__list-item">
            <DropdownNav title="Sản phẩm"></DropdownNav>
          </li>
          <li className="header-list__list-item">
            <DropdownNav title="Sản phẩm"></DropdownNav>
          </li>
          <li className="header-list__list-item">
            <DropdownNav title="Sản phẩm"></DropdownNav>
          </li>
          <li className="header-list__list-item">
            <DropdownNav title="Sản phẩm"></DropdownNav>
          </li>
          <li className="header-list__list-item">
            <DropdownNav title="Sản phẩm"></DropdownNav>
          </li>
          <li className="header-list__list-item">
            <DropdownNav title="Sản phẩm"></DropdownNav>
          </li>
        </ul>
      </Container>
    </Navbar>
  );
}

export default Header;
