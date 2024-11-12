import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ProductInsertModel.scss";
import { Product, Specifications } from '../../../initialize/type';
import { ProductDefault } from '../../../initialize/defaultType';
import FormInput from '../../../components/Card/FormInput';
import { Col, Row } from 'react-bootstrap';
import UploadImage from './component/UploadImage';

function ProductInsertModel() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [product, setProduct] = useState<Product>(ProductDefault);
  const [specifications, setSpecifications] = useState<Specifications>({
    id: 0,
    price: 0,
    quantity: 0,
    color: '',
    height: '',
    width: '',
    length: '',
    size: '',
    image: '', // Assuming `image` is a string for now
  });

  const [uploadedFileList, setUploadedFileList] = useState([]);
  console.log("11111111111111" + JSON.stringify(product));
  console.log("222222222222222" + JSON.stringify(specifications));

  const handleFileListChange = (fileList: any) => {
    setUploadedFileList(fileList);
    console.log('Received file list:', fileList); // Optional: Log the file list to see what is received
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm sản phẩm
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>THÊM SẢN PHẨM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            controlid="product-name"
            caption="Tên sản phẩm"
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
          />

          <FormInput
            controlid="description"
            caption="Mô tả"
            type="text"
            placeholder="Mô tả sản phẩm"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <FormInput
            controlid="price"
            caption="Giá tiền"
            type="number" // Updated to number for price
            placeholder="Giá sản phẩm"
            value={specifications?.price || ''}
            onChange={(e) =>
              setSpecifications({ ...specifications, price: Number(e.target.value) })
            }
          />

          <Row>
            <Col md={6}>
              <FormInput
                controlid="quantity"
                caption="Số lượng"
                type="number"
                placeholder="Nhập số lượng sản phẩm"
                value={specifications?.quantity || ''}
                onChange={(e) =>
                  setSpecifications({ ...specifications, quantity: Number(e.target.value) })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="color"
                caption="Màu sắc"
                type="text"
                placeholder="Màu sắc"
                value={specifications?.color}
                onChange={(e) =>
                  setSpecifications({ ...specifications, color: e.target.value })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="height"
                caption="Chiều cao"
                type="text"
                placeholder="Nhập chiều cao"
                value={specifications?.height}
                onChange={(e) =>
                  setSpecifications({ ...specifications, height: e.target.value })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="width"
                caption="Chiều rộng"
                type="text"
                placeholder="Nhập chiều rộng"
                value={specifications?.width}
                onChange={(e) =>
                  setSpecifications({ ...specifications, width: e.target.value })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="length"
                caption="Chiều dài"
                type="text"
                placeholder="Nhập chiều dài"
                value={specifications?.length}
                onChange={(e) =>
                  setSpecifications({ ...specifications, length: e.target.value })
                }
              />
            </Col>
            <Col md={6}>
              <FormInput
                controlid="size"
                caption="Size"
                type="text"
                placeholder="Size"
                value={specifications?.size}
                onChange={(e) =>
                  setSpecifications({ ...specifications, size: e.target.value })
                }
              />
            </Col>
          </Row>

          <UploadImage onFileListChange={handleFileListChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductInsertModel;
