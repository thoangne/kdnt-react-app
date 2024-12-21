import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormInput from '../../../../components/Card/FormInput';
import { User } from '../../../../initialize/type';
import { UpdateUserInfoAPI } from '../../../../services/UserService';
import { openFailNotification, openSuccessNotification } from '../../../../components/Notification';

interface CustomerUpdateModalProps {
  customer: User;
  onUpdate: (updatedCustomer: User) => void;
}

function CustomerUpdateModal({ customer, onUpdate }: CustomerUpdateModalProps) {
  const [show, setShow] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState<User>(customer);

  console.log("xxxxxxxxxxx"+JSON.stringify(updatedCustomer));

  const updateCustomerHandler = async() => {
    if(updatedCustomer.userId){
      const res = await UpdateUserInfoAPI(updatedCustomer.userId, updatedCustomer);
      if(res && res.data){
        openSuccessNotification("Cập nhật thông tin khách hàng thành công!", '');
      }else{
        openFailNotification("Cập nhật thông tin khách hàng thất bại!", "");
      }
    }
    
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (field: string, value: string) => {
    setUpdatedCustomer({
      ...updatedCustomer,
      [field]: value,
    });
  };

  const handleSaveChanges = () => {
    onUpdate(updatedCustomer);  // Pass updated customer back to parent component
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Sửa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            controlid="firstName"
            caption="Tên"
            type="text"
            placeholder="Nhập tên"
            value={updatedCustomer.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
          <FormInput
            controlid="lastName"
            caption="Họ"
            type="text"
            placeholder="Nhập họ"
            value={updatedCustomer.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
          <FormInput
            controlid="email"
            caption="Email"
            type="email"
            placeholder="Nhập email"
            value={updatedCustomer.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <FormInput
            controlid="STĐ"
            caption="SĐT"
            type="text"
            placeholder="Nhập STĐ"
            value={updatedCustomer.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />

          <FormInput
            controlid=""
            caption="SĐT"
            type="text"
            placeholder="Nhập STĐ"
            value={updatedCustomer.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />  

          <FormInput
            controlid="username"
            caption="Tên đăng nhập"
            type="text"
            placeholder="Nhập username"
            value={updatedCustomer.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />  

          <FormInput
            controlid="password"
            caption="Mật khẩu"
            type="password"
            placeholder=""
            value={updatedCustomer.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />  

          <p>Tạo tài khoản ngày : <strong>{customer.createAt}</strong></p>
          <p>Trạng thái: <strong>{customer.status ? "Đang hoạt động" : ""}</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={updateCustomerHandler}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerUpdateModal;
