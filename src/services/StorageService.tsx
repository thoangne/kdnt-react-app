import axios from "./CustomizeAxios";

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