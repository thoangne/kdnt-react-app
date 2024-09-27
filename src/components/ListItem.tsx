import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "./Card/ProductCard";
import "./ListItem.scss";

function ContainerFluidBreakpointExample() {
  return (
    <Container fluid="md">
      <Row className="row-gap">
        <Col className="d-flex justify-content-between align-items-center">
          <h2 className="text-gap">Tên danh mục</h2>
          <a className="text-ep" href="">
            Xem thêm
          </a>
        </Col>
      </Row>
      <Row>
        <Col className="mb-10">
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
      </Row>
      <Row>
        <Col className="mb-10">
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
      </Row>
      <Row>
        <Col className="mb-10">
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
      </Row>
      <Row>
        <Col className="mb-10">
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
      </Row>
    </Container>
  );
}

export default ContainerFluidBreakpointExample;
