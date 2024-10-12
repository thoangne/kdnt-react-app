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

export const downloadFileS3 = (filename:string) => {
    return axios.get(`/file/download${filename}`);
}