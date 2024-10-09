import React from "react";
import "./CarouselCard.scss";
import { Card, Col, Container, Row } from "react-bootstrap";
import defaultimg from "../../assets/DefaultImg.jpg";
import baohanh from "../../assets/baohanh.png";
 import doitra from '../../assets/doitra.png';
import giaohang from '../../assets/giaohang.png';
 import tuvan from '../../assets/tuvan.png';
import "./SupportCard.scss";
import SlideAuto from "./SlideAuto";

export const SupportCard = () => {
  return (
    
<Container >
  <Row>
    <span className='text-caption'> Khách hàng Moho tại</span>
  </Row>
  <Row>
    <SlideAuto></SlideAuto>
  </Row>
  <Row className="g-0 border-new">
    <Col>
      <Card className="d-flex border-none flex-column justify-content-center align-items-center">
        <Card.Img src={giaohang} className="img-outlet" />
        <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
          <Card.Title className="tittle-outlet">Giao hàng và lắp đặt</Card.Title>
          <Card.Text className="text-outlet">Miễn phí</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col>
      <Card className="d-flex border-none flex-column justify-content-center align-items-center">
        <Card.Img src={doitra} className="img-outlet" />
        <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
          <Card.Title className="tittle-outlet">Đổi trả 1-1</Card.Title>
          <Card.Text className="text-outlet">Miễn phí</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col>
      <Card className="d-flex border-none flex-column justify-content-center align-items-center">
        <Card.Img src={baohanh} className="img-outlet" />
        <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
          <Card.Title className="tittle-outlet">Bảo hành 2 năm</Card.Title>
          <Card.Text className="text-outlet">Miễn phí</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col>
      <Card className="d-flex border-none flex-column justify-content-center align-items-center">
        <Card.Img src={tuvan} className="img-outlet" />
        <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
          <Card.Title className="tittle-outlet">Tư vấn thiết kế</Card.Title>
          <Card.Text className="text-outlet">Miễn phí</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
  );
};
