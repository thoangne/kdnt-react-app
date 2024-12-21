import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { deleteProductAPI, fetchAllProduct } from "../../../../services/ProductService";
import { Product } from "../../../../initialize/type";
import { downloadFileS3 } from "../../../../services/StorageService";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import ProductUpdateModal from "../component/modal/ProductUpdateModal";
import { openFailNotification, openSuccessNotification } from "../../../../components/Notification";
import {confirm} from "../../../components/common/confirm/confirm";
import "./RecentProduct.scss";
import { FaDeleteLeft } from "react-icons/fa6";



function RecentProduct({ onEdit }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  // Hàm tải dữ liệu sản phẩm
  useEffect(() => {
    const getAllProducts = async () => {
      const res = await fetchAllProduct();
      setProducts(res.data);
    };

    getAllProducts();
  }, []);

  // Hàm tải ảnh cho sản phẩm
  const handleDownload = async (imageName: string) => {
    const url = await downloadFileS3(imageName);
    return url;
  };

  // Tải ảnh cho mỗi sản phẩm
  useEffect(() => {
    const loadImages = async () => {
      const productImages: { [key: string]: string } = {};
      for (const product of products) {
        const productImage = product.specifications?.[0]?.image?.[0]?.imageName;
        if (productImage) {
          const imageUrl = await handleDownload(productImage);
          productImages[product.productId] = imageUrl;
        }
      }
      setImageUrls(productImages); // Lưu URL ảnh vào state
    };

    if (products.length > 0) {
      loadImages();
    }
  }, [products]); // Chạy lại khi `products` thay đổi


  return (
    <div>
      <div className="products-container">
        <table>
          <thead className="products-thead">
            <tr>
              <td>ID</td>
              <td>hình ảnh</td>
              <td>Sản phẩm</td>
              <td>Giá</td>
              <td>Số lượng</td>
              <td>Trạng thái</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const imageUrl = imageUrls[product.productId];

              return (
                
                <tr key={product.productId}>
                  
                  <td><Link to={`/product-detail/${product.productId}`}>{product.productId}</Link></td>
                  <td>
                    <Link to={`/product-detail/${product.productId}`}>
                    {/* Nếu có ảnh, hiển thị ảnh; nếu không có, hiển thị "Không có ảnh" */}
                    {imageUrl ? (
                      <img src={imageUrl} alt={product.name} width="100" height="100" />
                    ) : (
                      <span>Không có ảnh</span>
                    )}
                      </Link>
                  </td>
                  <td className="product-name"> <Link to={`/product-detail/${product.productId}`}>{product.name}</Link></td>
                  <td>{product.specifications[0].price}</td>
                  <td>{product.specifications[0].quantity}</td>
                  <td className="status"> 
                    {product.specifications[0].quantity !== 0? (
                      <span>Còn hàng</span>
                    ) : (
                      <span>Hết hàng</span>
                    )}
                  </td>
                  <td>
                      <ProductUpdateModal product = {product}></ProductUpdateModal>
                  </td>
                </tr>
                
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentProduct;
