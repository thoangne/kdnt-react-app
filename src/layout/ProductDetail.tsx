import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { FacebookFilled, StarFilled } from "@ant-design/icons";
import QuantitySelector from "../components/QuantitySelector";
import { useParams } from "react-router-dom";
import { Product, Specifications } from "../initialize/type";
import { fetchProductById } from "../services/ProductService";
import { downloadFileS3 } from "../services/StorageService";
import Default_Image from "../assets/DefaultImg.jpg";
import AddCartButton from "../components/button/AddCartButton";
import { useUserContext } from "../context/UserContext";
import "./ProductDetail.scss";
import { fetchAllSpecificationAPI } from "../services/SpecificationsService";

interface Spec {
  id: number;
  length: number;
  width: number;
  height: number;
}

export const ProductDetail = () => {
  const { myInfo } = useUserContext();
  const [listImageUrl, setListImageUrl] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>(Default_Image);
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams();
  const [specification, setSpecification] = useState<Spec[]>([]);
  const [selectedSpecification, setSelectedSpecification] = useState<Spec | null>(null);

  // Lấy danh sách URL ảnh từ S3
  const getListImageUrl = async () => {
    if (product?.specifications) {
      const imageUrls = await Promise.all(
        product.specifications
          .flatMap((spec) => spec.image || [])
          .map((image) => downloadFileS3(image.imageName))
      );
      return imageUrls;
    }
    return [];
  };

  console.log("1100"+JSON.stringify(selectedSpecification));

  // Fetch thông tin sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const res = await fetchProductById(productId);
        setProduct(res.data);
      }
    };
    fetchProduct();
  }, [productId]);

  // Fetch ảnh sản phẩm
  useEffect(() => {
    const fetchImages = async () => {
      if (product) {
        const list = await getListImageUrl();
        if (list.length) {
          setListImageUrl(list);
          setMainImage(list[0]);
        }
      }
    };
    fetchImages();
  }, [product]);

  // Fetch thông số kỹ thuật
  useEffect(() => {
    const getAllSpecifications = async () => {
      if (product?.productId) {
        try {
          const res = await fetchAllSpecificationAPI(product.productId);
          if (res?.data) {
            setSpecification(res.data);
          }
        } catch (error) {
          console.error("Error fetching specifications:", error);
        }
      }
    };
    getAllSpecifications();
  }, [product]);

  if (!product) return <div>Loading...</div>;

  const totalQuantity = (product.specifications as any[])?.reduce(
    (sum, specification: any) => sum + (specification.quantity || 0),
    0
  );

  const formattedPrice = (price: number, discountPercent: number = 0) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
    }).format(price * (1 - discountPercent / 100));

  return (
    <Container>
      <Row>
        <Col xs={7}>
          <Row>
            <Col xs={2}>
              {listImageUrl.map((url, index) => (
                <Image
                  key={index}
                  src={url || Default_Image}
                  thumbnail
                  onClick={() => setMainImage(url)}
                  className="mb-3"
                  style={{ cursor: "pointer" }}
                />
              ))}
            </Col>
            <Col xs={10}>
              <Image src={mainImage || Default_Image} alt="Main" fluid />
            </Col>
          </Row>
        </Col>

        <Col xs={5}>
          <Row className="cust-rw">
            <Col>
              <div className="text-cap">{product?.name}</div>
              <Row>
                <Col xs={6}>
                  {[...Array(5)].map((_, i) => (
                    <StarFilled key={i} className="star-cust" />
                  ))}
                  <span className="size-f">(00)</span>
                </Col>
                <Col xs={3}>
                  <span className="size-f">
                    Chia sẻ: <FacebookFilled />
                  </span>
                </Col>
                <Col xs={3}>
                  <span className="size-f">Số lượng: {totalQuantity}</span>
                </Col>
              </Row>
              <div className="size-f">
                <strong>SKU: {product?.productId}</strong>
              </div>
            </Col>
          </Row>

          {/* Giá và giảm giá */}
          <Row className="d-flex cust-rw">
            <Col xs={2}>
              <span className="sale-tex">
                -{product?.specifications[0]?.discountPercent || 0}%
              </span>
            </Col>
            <Col xs={2}>
              <span className="tex-price">
                {formattedPrice(
                  product?.specifications[0]?.price || 0,
                  product?.specifications[0]?.discountPercent
                )}
              </span>
            </Col>
            <Col xs={2}>
              <del className="tex-pre">
                {formattedPrice(product?.specifications[0]?.price || 0)}
              </del>
            </Col>
          </Row>

          <div className="spe-select">
            <h4>Thông số kỹ thuật</h4>
            {specification.map((spec) => (
              <div
                key={spec.id}
                onClick={() => setSelectedSpecification(spec)}
              >
                <p className={`spec ${selectedSpecification?.id === spec.id ? "selected" : ""}`}>{`(Dài) ${spec.length} x (Rộng) ${spec.width} x (Cao) ${spec.height}`}</p>
              </div>
            ))}
          </div>

          {/* Nút thêm vào giỏ */}
          <AddCartButton
            specifications={selectedSpecification}
            user={myInfo}
          />
        </Col>
      </Row>
    </Container>
  );
};
