import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./ListProduct.scss";
import { fetchProductFilter, fetchProductsByCategoryId } from '../services/ProductService';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../components/Card/ProductCard';
import phongNguBanner from "../assets/phong-ngu-banner.jpg";
import { FilterObject, subCategory } from '../initialize/type';
import { FilterCheckboxMenu } from './FilterCheckboxMenu';

const ListProduct: React.FC = () => {
  const { categoryName, categoryId } = useParams<{ categoryName: string; categoryId: string }>();
  const [products, setProducts] = useState([]);
  const [filterObject, setFilterObject] = useState<FilterObject>({});

  
  console.log("Filter Object:", JSON.stringify(filterObject));

  useEffect(() => {
    const fetchProducts = async () => {
        // Nếu filterObject không rỗng, filter sản phẩm
      if(filterObject && filterObject.color?.length != 0 && filterObject.size?.length != 0 &&
        filterObject.minPrice?.length != 0 && filterObject.subCategory?.length != 0){
          await filterProduct(filterObject);
            
      } else if (categoryId) {
        // Nếu không có filterObject, lấy sản phẩm theo categoryId
        await getProductsByCategoryId(categoryId);
      }
    };
    
    fetchProducts();
  }, [filterObject, categoryId]);

  const filterProduct = async (filter: FilterObject) => {
    try {
      const res = await fetchProductFilter(filter);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const getProductsByCategoryId = async (categoryId: string) => {
    const res = await fetchProductsByCategoryId(categoryId);
    if (res) {
      setProducts(res); // Kiểm tra nếu res có data
    } 
  };


  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img id='img-banner' src={phongNguBanner} alt="Banner" />
        </Carousel.Item>
      </Carousel>
      <FilterCheckboxMenu handerChangeFilterObject={setFilterObject}></FilterCheckboxMenu>
      <div className="product-list">
        <Container>
          <p>trang-chu / danh-muc / {categoryName}</p>
          <Row>
            {products && products.length > 0 ? (
              products.map((product) => (
                <Col key={product.productId} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Link to={`/product-detail/${product.productId}`}>
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
      </div>
    </div>
  );
};

export default ListProduct;
