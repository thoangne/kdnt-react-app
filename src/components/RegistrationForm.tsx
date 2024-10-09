import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import './RegistrationForm.scss';
import { SwapLeftOutlined } from "@ant-design/icons";
import { Resgister } from "../initialize/type";
import { ResgisterDefault } from "../initialize/defaultType";
import FormInput from "./Card/FormInput";


const RegistrationForm: React.FC = () => {
  const [RegistrationInput, setRegistrationInput] = useState<Resgister>(ResgisterDefault); // Corrected initialization
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!RegistrationInput.firstName || !RegistrationInput.lastName || !RegistrationInput.password || !RegistrationInput.email || !RegistrationInput.phoneNumber) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setError("");
    console.log("Đăng ký thành công với:", RegistrationInput);
    // Reset form or perform other actions as necessary
  };

  return (
    <Container>
      <Row className="justify-content-center g-0 mb-100">
        <Col md={6} className="d-none d-md-block custom-form-col custom-image-col pm-100">
          <h1 className='text-caption'>Tạo tài khoản</h1>
          <span className='text-des'>Đăng ký tài khoản chỉ trong 1 phút để tích lũy điểm và nhận ưu đãi từ MOHO.</span>
        </Col>
        <Col md={6} className="custom-form-col pm-100">
          <h2 className="text-center">Tạo tài khoản mới</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}> {/* Attach handleSubmit to Form */}
            <FormInput
              controlid="first-name"
              caption=""
              type="text"
              placeholder="Họ"
              value={RegistrationInput.firstName}
              onChange={(e) => setRegistrationInput({ ...RegistrationInput, firstName: e.target.value })}
              meme="btn-custom"
            />

            <FormInput
              controlid="last-name"
              caption=""
              type="text"
              placeholder="Tên"
              value={RegistrationInput.lastName}
              onChange={(e) => setRegistrationInput({ ...RegistrationInput, lastName: e.target.value })}
              

 
            />

            <Form.Group controlId="formGender" >
              <div className="d-flex gap ">
                <Form.Check
                  type="radio"
                  label="Nam"
                  name="gender"
                  value="male"
                  checked={RegistrationInput.gender === "male"}
                  onChange={(e) => setRegistrationInput({ ...RegistrationInput, gender: e.target.value })}
                  className="mr-20"
                  />
                <Form.Check
                  type="radio"
                  label="Nữ"
                  name="gender"
                  value="female"
                  checked={RegistrationInput.gender === "female"}
                  onChange={(e) => setRegistrationInput({ ...RegistrationInput, gender: e.target.value })}
                />
              </div>
            </Form.Group>

            <FormInput
              controlid="email-input"
              caption=""
              type="email"
              placeholder="Email"
              value={RegistrationInput.email}
              onChange={(e) => setRegistrationInput({ ...RegistrationInput, email: e.target.value })}
              

            />

            <FormInput
              controlid="password-input"
              caption=""
              type="password"
              placeholder="Mật khẩu"
              value={RegistrationInput.password}
              onChange={(e) => setRegistrationInput({ ...RegistrationInput, password: e.target.value })}
              

            />

            <FormInput
              controlid="phone-input"
              caption=""
              type="number"
              placeholder="Số điện thoại"
              value={RegistrationInput.phoneNumber}
              onChange={(e) => setRegistrationInput({ ...RegistrationInput, phoneNumber: e.target.value })}
              

            />
            <p className="text-muted">
              Website được bảo vệ bởi reCAPTCHA và{" "}
              <a href="#">Chính sách bảo mật</a> và{" "}
              <a href="#">Điều khoản dịch vụ của Google</a>.
            </p>

            <Button variant="primary" type="submit" className="mt-3 btn-submit">
              Đăng ký
            </Button>

            <p>
              <SwapLeftOutlined /> Quay trở lại trang chủ
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
