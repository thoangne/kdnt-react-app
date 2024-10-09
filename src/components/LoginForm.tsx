import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import noithat from "../assets/noithat.jpg";
import "./LoginForm.scss";
import { Login } from "../../initialize/type";
import { LoginDefalt } from "../initialize/defaultType";
import FormInput from "./Card/FormInput";



const LoginForm: React.FC = () => {

  const [Logininfo,setLoginInfo] = useState<Login>({LoginDefalt});
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra email/số điện thoại và mật khẩu
    if (!Logininfo.username || !Logininfo.password) {
      setError("Vui lòng nhập email hoặc số điện thoại và mật khẩu.");
      return;
    }

    // Reset lỗi và xử lý đăng nhập
    setError("");
    console.log("Đăng nhập với", Logininfo.username, Logininfo.password);
    // Thêm logic cho quá trình đăng nhập thực tế tại đây (API call, v.v.)
  };

  return (
    <Container
      className=""
    >
      <Row
        className="justify-content-center  g-0 mb-100"
      >
        <Col md={6} className="d-none d-md-block custom-form-col custom-image-col pm-100">
          <img src={noithat} alt="Nội thất" className="img-fluid w-100" />
        </Col>

        <Col md={6} className="custom-form-col pm-100">
          <h2 className="text-center">Đăng nhập tài khoản</h2>
          <p className="text-center">Nhập email và mật khẩu của bạn:</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormInput
              controlid="username-input"
              caption="Emai hoặc số điện thoại"
              type="text"
              placeholder="Nhập email hoặc số điện thoại"
              value={Logininfo.username}
              onChange={(e) => setLoginInfo({...Logininfo,username:e.target.value})}
            ></FormInput>
            <FormInput
              controlid="password-input"
              caption="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              value={Logininfo.password}
              onChange={(e) => setLoginInfo({...Logininfo,password:e.target.value})}
            ></FormInput>

            <p className="text-muted">
              Website được bảo vệ bởi reCAPTCHA và{" "}
              <a href="#">Chính sách bảo mật</a> và{" "}
              <a href="#">Điều khoản dịch vụ của Google</a>.
            </p>
            <div className=" f-right d-flex ">
              <Button className="custom-btn" variant="primary" type="submit">
                Đăng nhập
              </Button>
            </div>
            <div className="custom-text justify-content-center align-items-center mt-3">
              <p style={{ textAlign: "center" }}>
                Khách hàng mới? <a href="/register">Tạo tài khoản</a>
              </p>
              <p style={{ textAlign: "center" }}>
                Quên mật khẩu? <a href="/forgot-password">Khôi phục mật khẩu</a>
              </p>
            </div>{" "}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
