import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Order } from '../../../../initialize/type';
import "./OrderDetailModal.scss";
import { Col, Row } from 'react-bootstrap';
import { openFailNotification, openSuccessNotification } from '../../../../components/Notification';
import { updateStatusOrderAPI } from '../../../../services/OrderService';
import { useUserContext } from '../../../../context/UserContext';

interface OrderDetailModalProps {
  orderDetail: Order;
}

function OrderDetailModal({ orderDetail }: OrderDetailModalProps) {
  const [show, setShow] = useState(false);

  const {myInfo} = useUserContext();

  console.log(JSON.stringify(myInfo));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmOrderHandler = async() =>{
    const res = await updateStatusOrderAPI(orderDetail);
    if(res && res.data){
      openSuccessNotification("Xác nhận đơn hàng thành công!", "");
      handleClose();
    }else{
      openFailNotification("Xác nhân đơn hàng thất bại!", "");
    }
  }

  return (
    <>
      <Button className='destail-btn' onClick={handleShow}>
        Xem chi tiết
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chi Tiết Đơn Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
            <p><strong>ID Đơn Hàng:</strong> {orderDetail.orderId}</p>
            <p><strong>Ngày Đặt Hàng:</strong> {orderDetail.orderDate}</p>
            <p><strong>Ngày Nhận Hàng:</strong> {orderDetail.receiptDate}</p>
            <p><strong>Trạng Thái:</strong> {orderDetail.orderStatus}</p>
            <p><strong>Địa Chỉ:</strong> {orderDetail.street}, {orderDetail.ward}, {orderDetail.district}, {orderDetail.province}</p>
            </Col>
            <Col md={6}>
              <p><strong>Khách hàng:</strong> {orderDetail.user.firstName +" "+ orderDetail.user.lastName}</p>
              <p><strong>Số điện thoại: </strong>{orderDetail.user.phoneNumber}</p>
              <p><strong>Email: </strong>{orderDetail.user.email}</p>
            </Col>
          </Row>
          {orderDetail && orderDetail.orderItem && orderDetail.orderItem.map((item, index) => (
            <div key={index} className='order-item'>
              <p><strong>Sản phẩm:</strong> {item.specifications.product.name}</p>
              <p>{`Tổng số tiền (${item.quantity} sản phầm): ${item.specifications.price}đ`}</p>
              {/* Hiển thị thông tin chi tiết của specifications và order nếu cần */}
            </div>
          ))}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          {
            orderDetail.status && myInfo?.roles.includes("ADMIN")?<Button variant="primary" onClick={confirmOrderHandler}>
            Xác nhận
          </Button> : null
          }
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderDetailModal;
