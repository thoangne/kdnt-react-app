import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Product, PromotionProductRequest } from '../../../initialize/type';
import { fetchProductsNotInPromotion } from '../../../services/ProductService';
import { ApplyProductForPromotionAPI } from '../../../services/PromotionService';
import { openFailNotification, openSuccessNotification } from '../../../components/Notification';
import "./SelectProduct.scss";
interface SelectProductsProps {
  promotionId: string | undefined; // Đảm bảo rằng promotionId được truyền dưới dạng prop
}

export const SelectProducts = ({ promotionId }: SelectProductsProps) => {
  // Quản lý danh sách sản phẩm
  const [products, setProducts] = useState<{ value: string, label: string }[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<{ value: string, label: string }[]>([]);
  const [promotionProductRequests, setPromotionProductRequests] = useState<PromotionProductRequest[]>([]);

  useEffect(() => {
    const getAllProductsNotInPromotion = async () => {
      const res = await fetchProductsNotInPromotion();
      if (res && res.data) {
        // Chuyển đổi dữ liệu sản phẩm thành { value, label }
        const options = res.data.map((product: Product) => ({
          value: product.productId, // Dùng productId làm value
          label: `${product.productId} - ${product.name}`, // Hiển thị productId và tên sản phẩm trong label
        }));
        setProducts(options);
      }
    };
    getAllProductsNotInPromotion();
  }, []); 

  // Xử lý sự kiện khi giá trị thay đổi
  const handleChange = (selected: any) => {
    setSelectedOptions(selected);

    // Chuyển đổi các lựa chọn thành đối tượng PromotionProductRequest
    const selectedProducts = selected.map((option: { value: string }) => ({
      promotion: { promotionId }, // Gắn promotionId vào request
      product: { productId: option.value }, // Gắn productId vào request
    }));

    setPromotionProductRequests(selectedProducts); // Cập nhật danh sách yêu cầu với nhiều sản phẩm
  };

  // Hàm xử lý áp dụng sản phẩm cho khuyến mãi
  const applyProductForPromotionHandle = async () => {
    let success = true; // Biến để kiểm tra xem tất cả yêu cầu đã thành công hay chưa
  
    // Sử dụng vòng lặp để gửi từng sản phẩm riêng biệt
    for (const request of promotionProductRequests) {
      const res = await ApplyProductForPromotionAPI(request); // Gọi API cho mỗi sản phẩm
  
      // Nếu có bất kỳ lỗi nào, đánh dấu success là false và dừng vòng lặp
      if (!res || !res.data) {
        success = false;
        break; // Dừng vòng lặp khi có lỗi
      }
    }
  
    // Kiểm tra kết quả và hiển thị thông báo
    if (success) {
      openSuccessNotification("Áp dụng tất cả sản phẩm khuyến mãi thành công!", "");
    } else {
      openFailNotification("Áp dụng sản phẩm khuyến mãi thất bại!", "");
    }
  };
  

  return (
    <><h2>Chọn sản phẩm</h2>
      <div className='select-product-container'>
        <div className='select-product'>
        <Select
          value={selectedOptions} // Giá trị hiện tại (danh sách các sản phẩm được chọn)
          onChange={handleChange} // Xử lý khi thay đổi
          isMulti // Cho phép chọn nhiều
          name="products"
          options={products} // Danh sách các sản phẩm
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select products..." // Placeholder khi chưa chọn
          noOptionsMessage={() => "No options available"} // Thông báo khi không có tùy chọn
        />
        </div>

      <div>
        <button className='select-promotion-btn' onClick={applyProductForPromotionHandle}>Áp dụng</button></div>
      </div>
      </>
  );
};
