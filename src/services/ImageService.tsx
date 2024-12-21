import { Product } from "../initialize/type";
import axios from "./CustomizeAxios";
import { downloadFileS3 } from "./StorageService";
import { checkToken } from "./TokenService";

// Hàm lấy ảnh của thẻ sản phẩm
export const fetchProductCardImage = async (productId: string) => {
  try {
    const response = await axios.get(`/img${productId}`);
    return response.data; // Trả về dữ liệu ảnh từ server
  } catch (error) {
    console.error("Lỗi khi tải ảnh sản phẩm:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Hàm upload ảnh cho sản phẩm
export const saveImage = async (specificationId: number, files: File[]) => {
  const token = await checkToken(); // Kiểm tra và lấy token người dùng

  // Tạo FormData để chứa các file
  const formData = new FormData();

  // Append từng file vào FormData với tên trường 'image'
  files.forEach((file) => {
    formData.append('image', file); // Dùng 'image' thay vì 'image[]' nếu server yêu cầu
  });

  try {
    // Gửi yêu cầu POST lên server để upload ảnh
    const res = await axios.post(
      `http://localhost:8081/img/${specificationId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Đảm bảo Content-Type là multipart/form-data
          'Authorization': `Bearer ${token}`, // Gửi token trong header
        },
      }
    );

    return res.data; // Trả về dữ liệu từ server nếu upload thành công
  } catch (error) {
    console.error("Lỗi khi thêm ảnh cho sản phẩm:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};


export const displayImage = async(products: Product[]) => {

  const handleDownload = async (imageName: string) => {
    const url = await downloadFileS3(imageName);
    return url;
  };
  
  const productImages: { [key: string]: string } = {};
  for (const product of products) {
    const productImage = product.specifications?.[0]?.image?.[0]?.imageName;
    if (productImage) {
      const imageUrl = await handleDownload(productImage);
      productImages[product.productId] = imageUrl;
    }
  }

  return productImages;
}
