import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "./Card/ProductCard";
import "./ListItem.scss";
import { useEffect, useState } from "react";
import { Product } from "../initialize/type";
import { fetchAllProduct } from "../services/ProductService";
import { Link } from "react-router-dom";

function ListItem() {
  const [listProduct, setListProduct] = useState<Product[]>([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    const products = await fetchAllProduct();
    if (products && products && products.data) {
      setListProduct(products.data);
    }
  };

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
        {listProduct && listProduct.length > 0 ? (
          listProduct.map((product) => (
            <Col key={product.productId} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Link to = {`/product-detail/${product.productId}`}>
                <ProductCard product={product} />
              </Link>
            </Col>
          ))
        ) : (
          <Col>
            <p>No products available</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default ListItem;
