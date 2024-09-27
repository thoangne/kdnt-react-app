import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import noithat from "../assets/noithat.jpg";
import "./InputForm.scss";

const LoginForm: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra email/số điện thoại và mật khẩu
    if (!emailOrPhone || !password) {
      setError("Vui lòng nhập email hoặc số điện thoại và mật khẩu.");
      return;
    }

    // Reset lỗi và xử lý đăng nhập
    setError("");
    console.log("Đăng nhập với", emailOrPhone, password);
    // Thêm logic cho quá trình đăng nhập thực tế tại đây (API call, v.v.)
  };

  return (
    <Container
      fluid
      className="d-flex vh-100 justify-content-center align-items-center"
    >
      <Row
        className="justify-content-center g-0"
        style={{ width: "80%", maxWidth: "900px" }}
      >
        <Col md={6} className="d-none d-md-block custom-image-col">
          <img src={noithat} alt="Nội thất" className="img-fluid w-100" />
        </Col>

        <Col md={6} className="custom-form-col">
          <h2 className="text-center">Đăng nhập tài khoản</h2>
          <p className="text-center">Nhập email và mật khẩu của bạn:</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmailOrPhone">
              <Form.Label>Nhập email hoặc số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email hoặc số điện thoại"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
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
