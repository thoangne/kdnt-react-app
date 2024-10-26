import { Col, Container, Row } from "react-bootstrap";
import "./CheckOut.scss";
import ShoppingCartCard from "../components/Card/ProductCartCard";
import { useEffect, useState } from "react";
import { ShoppingCart } from "../initialize/type";
import { fetchShoppingCartByUser } from "../services/ShoppingCartService";
import { useUserContext } from "../context/UserContext";
import { downloadFileS3 } from "../services/StorageService";

export const CheckOut = () => {
  const [shoppingCartItem, setShoppingCartItem] = useState<ShoppingCart[]>([]);
  const { myInfo } = useUserContext();
  const [error, setError] = useState<string | null>(null); // Thêm state để xử lý lỗi

  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchImages = async () => {
      const urls: { [key: string]: string } = {};

      for (const item of shoppingCartItem) {
        const imageName = item?.specifications?.image?.[0]?.imageName;
        if (imageName) {
          try {
            const url = await downloadFileS3(imageName);
            urls[item.productCartId] = url;
          } catch (error) {
            console.error("Error downloading image:", error);
          }
        }
      }

      setImageUrls(urls);
    };

    if (shoppingCartItem.length > 0) {
      fetchImages();
    }
  }, [shoppingCartItem]);

  useEffect(() => {
    const getItem = async () => {
      try {
        if (myInfo) {
          const res = await fetchShoppingCartByUser(myInfo.userId);
          if (res) {
            setShoppingCartItem(res.data); 
          }
        }
      } catch (err) {
        setError("Không thể tải giỏ hàng. Vui lòng thử lại sau."); // Xử lý lỗi
        console.error(err);
      }
    };
    getItem(); // Gọi hàm async
  }, [myInfo]); // Phụ thuộc vào myInfo thay vì ShoppingCartItem

  return (
    <Container>
      <h1 className="name-cart">Giỏ hàng của bạn</h1>
      <Row>
        <Col xs={8}>
          <div className="text-vol-cart">
            {shoppingCartItem.length > 0
              ? `Có ${shoppingCartItem.length} sản phẩm trong giỏ hàng`
              : "Giỏ hàng của bạn trống"}
          </div>
          {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi */}
          {shoppingCartItem && shoppingCartItem.map((item, index) => (
            <ShoppingCartCard
              shoppingCartId = {item.productCartId}
              name={item.productName} // Hiển thị dữ liệu thực
              prePrice={item.specifications?.price} // Thay thế giá trị thực từ API
              undPrice={20000} // Thay thế giá trị thực từ API
              typeItem={`${item.specifications?.color + " / " + item.specifications?.height + " / " + item.specifications?.width + " / " + item.specifications?.length}` } // Hiển thị dữ liệu thực
              imageURL={imageUrls[item.productCartId] || "link-to-default-image.jpg"}
              initialQuantity={item.quantity} // URL ảnh sản phẩm
            />
          ))}
        </Col>
        <Col xs={4}>
          <h3>Thông tin đơn hàng</h3>
          <h3>Tổng tiền</h3>
          <h3 className="hellll">
            {shoppingCartItem.reduce((total, item) => total + item.specifications?.price, 0).toLocaleString("vi-VN")} VND
          </h3> {/* Tính tổng tiền */}
          <button className="btn-checkout">Thanh toán</button>
        </Col>
      </Row>
    </Container>
  );
};
