import "./BodyMenu.scss"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import imgaView2 from './../assets/imgaView2.jpg'
import imgaView31 from './../assets/imgaView31.jpg'
import { Banner } from './../initialize/type.tsx';

interface BannerPros{
    bannerName: Banner;
}

const BodyMenu: React.FC<BannerPros> = ({ bannerName}) =>{
    return (
    <Container>
<Row className="row-gap">
  <Col className="d-flex justify-content-between align-items-center">
    <span className="text-caption">{bannerName.name}</span>
    <a className="text-ep" href="">Xem thêm</a>
  </Col>
</Row>
      <Row className="equal-height">
        <Col className="Col-left" sm={4}>
          <img className="column-img" src={imgaView2} alt="" />
          <img className="column-img" src={imgaView2} alt="" />
        </Col>
        <Col className="Col-right" sm={8}>
          <Row>
            <Col>
              <img className="column-img" src={imgaView31} alt="" />
            </Col>
          </Row>
          <Row>
            <Col>
              <img className="column-img" src={imgaView2} alt="" />
            </Col>
            <Col>
              <img className="column-img" src={imgaView2} alt="" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>   )
}

export default BodyMenu;
