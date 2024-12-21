import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./MyInfo.scss";
import FormInput from "../components/Card/FormInput";
import { User } from "../initialize/type";
import { UserDefault } from "../initialize/defaultType";
import { useUserContext } from "../context/UserContext";
import { UpdateUserInfoAPI } from "../services/UserService";
import Sidebar from "./SideBar";

const MyInfo: React.FC = () => {
  const { myInfo } = useUserContext();
  const [UserInfo, setUserInfo] = useState<User>(UserDefault);
  const [error, setError] = useState<string>("");

  // Initialize UserInfo with myInfo data on component mount
  useEffect(() => {
    if (myInfo) {
      setUserInfo(myInfo);
    }
  }, [myInfo]);

  const UpdateMyInfo = async () => {
    try {
      await UpdateUserInfoAPI(myInfo?.userId, UserInfo);
      console.log("User info updated:", UserInfo);
    } catch (err) {
      console.error("Error updating user info:", err);
    }
  };

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
    setError("");
    UpdateMyInfo(); // Call update function on submit
  };

  return (
    <div className="account-form-container">
      <Row className="cust-row">
        <Col>
          <span className="cap-info">Tài khoản của bạn</span>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
           <Sidebar></Sidebar>
        </Col>
        <Col xs={9}>
          <h2>Thông tin tài khoản</h2>
          <Row>
            {/* <h5><span>ID: {UserInfo.userId}</span></h5> */}
            <Col>
              <Form onSubmit={handleSubmit}>
                <FormInput
                  controlid="email"
                  caption="Email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={UserInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...UserInfo, email: e.target.value })
                  }
                />
                <FormInput
                  controlid="firstname"
                  caption="Họ"
                  type="text"
                  placeholder="Nhập họ của bạn"
                  value={UserInfo.firstName}
                  onChange={(e) =>
                    setUserInfo({ ...UserInfo, firstName: e.target.value })
                  }
                />
                <FormInput
                  controlid="lastname"
                  caption="Tên"
                  type="text"
                  placeholder="Nhập tên của bạn"
                  value={UserInfo.lastName}
                  onChange={(e) =>
                    setUserInfo({ ...UserInfo, lastName: e.target.value })
                  }
                />
                <FormInput
                  controlid="username"
                  caption="Tên đăng nhập"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={UserInfo.username}
                  onChange={(e) =>
                    setUserInfo({ ...UserInfo, username: e.target.value })
                  }
                />
                <FormInput
                  controlid="password"
                  caption="Mật khẩu"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={UserInfo.password}
                  onChange={(e) =>
                    setUserInfo({ ...UserInfo, password: e.target.value })
                  }
                />
                <Form.Group controlId="formGender">
                  <div className="d-flex gap">
                    <Form.Check
                      type="radio"
                      label="Nam"
                      name="gender"
                      value="male"
                      checked={UserInfo.gender === "male"}
                      onChange={(e) =>
                        setUserInfo({ ...UserInfo, gender: e.target.value })
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
                        setUserInfo({ ...UserInfo, gender: e.target.value })
                      }
                    />
                  </div>
                </Form.Group>
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
                <button type="submit" className="btn-submit">
                  Cập nhật
                </button>
                {error && <div className="error-msg">{error}</div>}
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MyInfo;
