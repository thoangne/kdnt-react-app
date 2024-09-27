import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from './Card/ProductCard';
import './ListItem.scss' 

function ContainerFluidBreakpointExample() {

      return (

    <Container fluid="md">
        <Row>
            <span>Tên danh mục</span>
        </Row>
      <Row>
        <Col className='mb-10'>
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
        <Col className='mb-10'>
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
        <Col className='mb-10'>
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
        <Col className='mb-10'>
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