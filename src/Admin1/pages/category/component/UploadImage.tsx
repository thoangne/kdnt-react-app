import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Button, List, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

type FileType = Parameters<UploadProps['beforeUpload']>[0];

// Hàm chuyển file thành Base64 để xem trước
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadImageProps {
  onFileListChange: (fileList: File[]) => void; // Trả về danh sách file kiểu File
}

const UploadImage: React.FC<UploadImageProps> = ({ onFileListChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // Hàm hiển thị ảnh xem trước
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // Hàm thay đổi danh sách file khi người dùng chọn file mới
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
    // Chuyển đổi file từ UploadFile sang kiểu File
    const files = newFileList.map((file) => file.originFileObj as File);
    
    onFileListChange(files); // Gọi prop để trả về danh sách file kiểu File
  };

  // Hàm upload ảnh
  const handleUpload = async () => {
    setUploading(true);

    // Kiểm tra định dạng và kích thước của các file
    const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    const invalidFiles = fileList.filter((file) => {
      const isValidType = validFileTypes.includes(file.type);
      const isValidSize = file.size <= maxFileSize;
      return !isValidType || !isValidSize;
    });

    if (invalidFiles.length > 0) {
      // Hiển thị thông báo lỗi nếu có file không hợp lệ
      message.error('Vui lòng chỉ tải lên các hình ảnh với định dạng JPG, PNG, hoặc GIF và kích thước không vượt quá 5MB.');
      setUploading(false);
      return;
    }

    // Logic cho việc upload lên server (giả sử bạn gọi API upload ở đây)
    console.log('Uploading files:', fileList);

    // Sau khi upload xong
    setUploading(false);
  };

  // Button upload
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <h4>Tải hình ảnh sản phẩm</h4>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
        beforeUpload={() => false} // Prevent auto-upload
      >
        {fileList.length >= 10 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        Upload Selected Images
      </Button>
    </>
  );
};

export default UploadImage;
