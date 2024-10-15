import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./MyInfo.scss";
import FormInput from "../components/Card/FormInput";
import { User } from "../initialize/type";
import { UserDefault } from "../initialize/defaultType";
import { useUserContext } from "../context/UserContext";

const MyInfo: React.FC = () => {
  const [UserInfo, setUserInfo] = useState<User>(UserDefault);
  const [error, setError] = useState<string>("");
  const {myInfo} = useUserContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check required fields
    if (
      !UserInfo.firstName ||
      !UserInfo.lastName ||
      !UserInfo.email ||
      !UserInfo.dayofbirth
    ) {
      setError("Vui lòng cập nhập đầy đủ thông tin.");
      return;
    }
    // Reset error if no issues
    setError("");
    console.log("Submitted Info:", UserInfo);
  };

  return (
    <>
      <Container>
        <Row className="cust-row">
          <Col>
            <span className="cap-info">Tài khoản của bạn</span>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Row className="mt-20" >
              <Col>
                <h2 className="account-cust">Tài khoản</h2>
              </Col>
            </Row>
            <Row  >
              <Col >
                <ul className="list-unstyle">
                  <li className="cust-row w-50p ">
                    <a className="list-cur " href="#">
                      Thông tin tài khoản
                    </a>
                  </li>
                  <li className="cust-row w-50p">
                    <a className="list-cur" href="#">
                      Danh sách địa chỉ
                    </a>
                  </li>
                  <li className="cust-row w-50p">
                    <a className="list-cur" href="#">
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col xs={8}>
            <Row className="mt-20" >
              <h2>Thông tin tài khoản</h2>
            </Row>
            <Row>
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <FormInput
                        controlid="email"
                        caption="Email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={myInfo?.email}
                        onChange={(e) =>
                          setUserInfo({ ...UserInfo, email: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormInput
                        controlid="fisrtname"
                        caption="Họ"
                        type="text"
                        placeholder="Nhập họ của bạn"
                        value={myInfo?.firstName}
                        onChange={(e) =>
                          setUserInfo({
                            ...UserInfo,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormInput
                        controlid="name"
                        caption="Tên"
                        type="text"
                        placeholder="Nhập tên của bạn"
                        value={myInfo?.lastName}
                        onChange={(e) =>
                          setUserInfo({ ...UserInfo, lastName: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col>
                      <FormInput
                        controlid="name"
                        caption="Tên đăng nhập"
                        type="text"
                        placeholder="Nhập tên của bạn"
                        value={myInfo?.username}
                        onChange={(e) =>
                          setUserInfo({ ...UserInfo, lastName: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormInput
                        controlid="name"
                        caption="Mật khẩu"
                        type="text"
                        placeholder="Nhập tên của bạn"
                        value={myInfo?.password}
                        onChange={(e) =>
                          setUserInfo({ ...UserInfo, lastName: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group controlId="formGender">
                      <div className="d-flex gap ">
                        <Form.Check
                          type="radio"
                          label="Nam"
                          name="gender"
                          value="male"
                          checked={UserInfo.gender === "male"}
                          onChange={(e) =>
                            setUserInfo({
                              ...UserInfo,
                              gender: e.target.value,
                            })
                          }
                          className="mr-20"
                        />
                        <Form.Check
                          type="radio"
                          label="Nữ"
                          name="gender"
                          value="female"
                          checked={UserInfo.gender === "female"}
                          onChange={(e) =>
                            setUserInfo({
                              ...UserInfo,
                              gender: e.target.value,
                            })
                          }
                        />
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <FormInput
                        controlid="dob"
                        caption="Ngày sinh"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        value={UserInfo.dayofbirth}
                        onChange={(e) =>
                          setUserInfo({ ...UserInfo, dayofbirth: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  {/* Additional inputs can be added similarly */}
                  {/* Add submit button here */}
                  <Row>
                    <Col>
                      <button type="submit" className="btn-submit">
                        Cập nhật
                      </button>
                    </Col>
                  </Row>
                  {error && (
                    <Row>
                      <Col>
                        <span className="error-msg">{error}</span>
                      </Col>
                    </Row>
                  )}
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyInfo;
