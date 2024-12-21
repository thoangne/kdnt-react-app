import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ProductInsertModel.scss";
import { ProductRequest, SpecificationRequest } from '../../../../../initialize/type';
import { addProductAPI } from '../../../../../services/ProductService';
import { addSpecificationAPI } from '../../../../../services/SpecificationsService';
import FormInput from '../../../../../components/Card/FormInput';
import { Col, Row } from 'react-bootstrap';
import UploadImage from '../UploadImage';
import SubCategorySelect from '../../../../components/common/Dropdown';
import { openFailNotification, openSuccessNotification } from '../../../../../components/Notification';
import { saveImage } from '../../../../../services/ImageService';
import { upLoadFileS3 } from '../../../../../services/StorageService';

function ProductInsertModel() {
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [specificationId, setSpecificationId] = useState<number | null>(null);
  const [uploadedFileList, setUploadedFileList] = useState<any[]>([]);

  console.log("test image" + JSON.stringify(uploadedFileList));
  const [product, setProduct] = useState<ProductRequest>({
    name: '',
    description: '',
    subCategory: {
      subCategoryId: 0,
    },
  });

  console.log("add product" + JSON.stringify(product));

  const [specifications, setSpecifications] = useState<SpecificationRequest>({
    price: 0,
    quantity: 0,
    length: '',
    width: '',
    height: '',
    color: '',
    size: '',
    product: {
      productId: productId || '', // Initialize with productId
    },
  });

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileListChange = (fileList: any) => {
    setUploadedFileList(fileList);
    console.log('Received file list:', fileList);
  };

  useEffect(() => {
    // Khi productId thay đổi, gọi API để thêm thông tin specification
      addSpecificationHandler();
  }, [productId]); // Chạy khi productId thay đổi

  useEffect(() => {
    // Khi productId thay đổi, gọi API để thêm thông tin specification
      uploadImage();
      uploadFileS3();
  }, [specificationId, uploadedFileList]); // Chạy khi productId thay đổi
  // Cập nhật mã sản phẩm khi đã thêm sản phẩm thành công
  const addProductHandler = async () => {
    const res = await addProductAPI(product);
    if (res && res.data && res.data.productId) {
      setProductId(res.data.productId); // Cập nhật productId sau khi thêm sản phẩm
    }
  };

  

  const addSpecificationHandler = async () => {
    console.log("44444" + productId)
    if (productId !== null) {
      console.log("555555" + JSON.stringify(specifications));
      // Cập nhật lại productId trong specification trước khi thêm
      const updatedSpecifications = {
        ...specifications,
        product: {
          productId: productId,
        },
      };

      const res = await addSpecificationAPI(updatedSpecifications);
      if(res && res.data && res.data.id){
        setSpecificationId(res.data.id);
        openSuccessNotification("Thêm sản phầm mới thành công!", "");
        handleClose();
      }
      else{
        openFailNotification("Thêm sản phầm mới thất bại!", "");
        return;
      }
      // Gọi API thêm specification
    }
  };

  const uploadImage = async() => {
    if (uploadedFileList.length > 0 && specificationId !== null) {
      try {
        await saveImage(specificationId, uploadedFileList);
      } catch (error) {
        openFailNotification("thêm ảnh thất bại", "");
        console.error("Lỗi khi tải lên hình ảnh:", error);
      }
    }
  }

  const uploadFileS3 = async() => {
    if (uploadedFileList.length > 0 && specificationId !== null) {
      try {
        await upLoadFileS3(uploadedFileList);
      } catch (error) {
        openFailNotification("up hình ảnh lên S3 thất bại", "");
        console.error("Lỗi khi up hình ảnh lên S3 thất bại:", error);
      }
    }
  }

  const handleSubCategoryChange = (subCategoryId: number) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      subCategory: {
        ...prevProduct.subCategory,
        subCategoryId,
      },
    }));
  };

  return (
    <>
      <Button className="insert-product-btn" onClick={handleShow}>
        Thêm sản phẩm
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>THÊM SẢN PHẨM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SubCategorySelect 
            onSubCategoryChange={handleSubCategoryChange}
            value = {null}></SubCategorySelect>

          <FormInput
            controlid="product-name"
            caption="Tên sản phẩm"
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value,
              })
            }
          />

          <FormInput
            controlid="description"
            caption="Mô tả"
            type="text"
            placeholder="Mô tả sản phẩm"
            value={product.description}
            onChange={(e) =>
              setProduct({
                ...product,
                description: e.target.value,
              })
            }
          />

          <FormInput
            controlid="price"
            caption="Giá tiền"
            type="number"
            placeholder="Giá sản phẩm"
            value={specifications.price}
            onChange={(e) =>
              setSpecifications({
                ...specifications,
                price: Number(e.target.value),
              })
            }
          />

          <Row>
            <Col md={6}>
              <FormInput
                controlid="quantity"
                caption="Số lượng"
                type="number"
                placeholder="Nhập số lượng sản phẩm"
                value={specifications.quantity}
                onChange={(e) =>
                  setSpecifications({
                    ...specifications,
                    quantity: Number(e.target.value),
                  })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="color"
                caption="Màu sắc"
                type="text"
                placeholder="Màu sắc"
                value={specifications.color}
                onChange={(e) =>
                  setSpecifications({
                    ...specifications,
                    color: e.target.value,
                  })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="height"
                caption="Chiều cao"
                type="text"
                placeholder="Nhập chiều cao"
                value={specifications.height}
                onChange={(e) =>
                  setSpecifications({
                    ...specifications,
                    height: e.target.value,
                  })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="width"
                caption="Chiều rộng"
                type="text"
                placeholder="Nhập chiều rộng"
                value={specifications.width}
                onChange={(e) =>
                  setSpecifications({
                    ...specifications,
                    width: e.target.value,
                  })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="length"
                caption="Chiều dài"
                type="text"
                placeholder="Nhập chiều dài"
                value={specifications.length}
                onChange={(e) =>
                  setSpecifications({
                    ...specifications,
                    length: e.target.value,
                  })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="size"
                caption="Size"
                type="text"
                placeholder="Size"
                value={specifications.size}
                onChange={(e) =>
                  setSpecifications({
                    ...specifications,
                    size: e.target.value,
                  })
                }
              />
            </Col>
          </Row>

          <UploadImage onFileListChange={handleFileListChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={addProductHandler}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductInsertModel;
