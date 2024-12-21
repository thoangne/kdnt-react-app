import axios from "./CustomizeAxios";
import { checkToken } from "./TokenService";

export const uploadImagetoS3 = (file: File) => {
    const formData = new FormData();
    formData.append('file', file); // Thêm file vào FormData với key 'file'

    return axios.post("/file/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Đảm bảo header đúng cho form-data
        }
    });
}

export const downloadFileS3 = async(imageName:string) => {
    try {
        const response = await fetch(`http://localhost:8081/file/download/${imageName}`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        // console.log(url);
        return url;
    } catch (error) {
    console.error('Error downloading file:', error);
    }
}


export const upLoadFileS3 = async (files: File[]) => {
  const token = await checkToken(); // Kiểm tra và lấy token người dùng

  // Tạo FormData để chứa các file
  const formData = new FormData();

  // Append tất cả các file vào FormData với key 'file'
  files.forEach(file => {
    formData.append('file', file); // 'file' là key cho mỗi file
  });

  try {
    // Gửi yêu cầu POST lên server để upload các file
    const res = await axios.post(`http://localhost:8081/file/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Đảm bảo Content-Type là multipart/form-data
        'Authorization': `Bearer ${token}`, // Gửi token trong header
      },
    });

    return res.data; // Trả về dữ liệu từ server nếu upload thành công
  } catch (error) {
    console.error("Lỗi khi upload file lên S3:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
