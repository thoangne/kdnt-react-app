import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import noithat from "../assets/noithat.jpg";
import "./LoginForm.scss";
import { LoginDefalt } from "../initialize/defaultType";
import FormInput from "./Card/FormInput";
import { LoginAPI } from "../services/AuthorService";
import { Login } from "../initialize/type";
import {setToken} from "../services/TokenService"
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";


const LoginForm: React.FC = () => {
  const [Logininfo, setLoginInfo] = useState<Login>(LoginDefalt);
  const [error, setError] = useState<string>("");
  const { myInfo } = useUserContext();
  
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra và điều hướng khi myInfo đã có giá trị
    if (myInfo) {
      if (myInfo.roles[0]  === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");  // Điều hướng về trang chủ
        console.log(myInfo.roles);
      }
    }
  }, [myInfo, navigate]);  // Chỉ chạy khi myInfo thay đổi


  const LoginHandler = async (Logininfo: Login) => {
    console.log(Logininfo);
    try {
      const res = await LoginAPI(Logininfo);
      setToken(res.data.data.token);

      
      window.location.reload()
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra email/số điện thoại và mật khẩu
    if (!Logininfo.username || !Logininfo.password) {
      setError("Vui lòng nhập email hoặc số điện thoại và mật khẩu.");
      return;
    }

    LoginHandler(Logininfo);

    // Reset lỗi khi không có lỗi
    setError("");
    console.log("Đăng nhập với", Logininfo.username, Logininfo.password);
  };

  return (
    <Container>
      <Row className="justify-content-center g-0 mb-100">
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
              caption="Email hoặc số điện thoại"
              type="text"
              placeholder="Nhập email hoặc số điện thoại"
              value={Logininfo.username}
              onChange={(e) => setLoginInfo({ ...Logininfo, username: e.target.value })}
            />
            <FormInput
              controlid="password-input"
              caption="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              value={Logininfo.password}
              onChange={(e) => setLoginInfo({ ...Logininfo, password: e.target.value })}
            />

            <p className="text-muted">
              Website được bảo vệ bởi reCAPTCHA và{" "}
              <a href="#">Chính sách bảo mật</a> và{" "}
              <a href="#">Điều khoản dịch vụ của Google</a>.
            </p>
            <div className="f-right d-flex">
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
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
