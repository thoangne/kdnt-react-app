import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Product, ProductRequest } from '../../../../../initialize/type';
import FormInput from '../../../../../components/Card/FormInput';
import SpecificationModal from './SpecificationModal';
import "./SpecificationModal.scss"
import SubCategorySelect from '../../../../components/common/Dropdown';
import { Col, Row } from 'react-bootstrap';
import { openFailNotification, openSuccessNotification } from '../../../../../components/Notification';
import { updateProductAPI } from '../../../../../services/ProductService';
import { confirm } from '../../../../components/common/confirm/confirm';
import { MdOutlineEditCalendar } from "react-icons/md";
import "./ProductUpdateModal.scss"


interface ProductUpdateModalProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
}

const ProductUpdateModal = ({ product, onUpdate }: ProductUpdateModalProps) => {
  const [show, setShow] = useState(false);
  const [productUpdate, setProductUpdate] = useState<Product>(product);

  const [productRequest, setProductRequest] = useState<ProductRequest>({
    name: productUpdate.name,
    description: productUpdate.description,
    subCategory:{
      subCategoryId: productUpdate.subCategory?.subCategoryId
    }
  });
  const [isSpecificationModalOpen, setSpecificationModalOpen] = useState(false); // New state to control SpecificationModal

  const ProductUpdateHandler = async() => {
    try{
      if(productUpdate.productId){
        const res = await updateProductAPI(productUpdate.productId, productRequest);
        if(res && res.data){
          openSuccessNotification("Cập nhật sản phẩm thành công", "")
        }else{
          openFailNotification("Cập nhật sản phẩm thất bại!", "");
        }
      }
    }catch(e){
      openFailNotification("Cập nhật sản phẩm thất bại1111!", "");
    }

    
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleConfirm = async () => {
    handleClose();
    if (await confirm({confirmation: "Bạn muốn cập nhật thông tin sản phẩm?"})) {
      ProductUpdateHandler();
    }
    return;
  };


  const handleSpecificationModalOpen = () => {
    setSpecificationModalOpen(true);
    setShow(false); // Close ProductUpdateModal when SpecificationModal opens
  };

  const handleSubCategoryChange = (subCategoryId: number) => {
    setProductRequest((prevProduct) => ({
      ...prevProduct,
      subCategory: {
        ...prevProduct.subCategory,
        subCategoryId,
      },
    }));
  };

  return (
    <>
      <Button className='edit-product-btn' onClick={handleShow}> 
      <MdOutlineEditCalendar />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
            <label>Mã sản phẩm</label>
            <input
              value={productUpdate.productId || ''}
              disabled={true}
              className="form-control"
            />
            </Col>
            <Col md={6}>
            <label>Mã sản phẩm</label>
              <SubCategorySelect 
                onSubCategoryChange={handleSubCategoryChange}
                value = {productUpdate.subCategory?.name}></SubCategorySelect>
            </Col>
          </Row>
          

          

          <FormInput
            controlid="product-name"
            caption="Tên sản phẩm"
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={productRequest.name}
            onChange={(e) => setProductRequest({
              ...productRequest, 
              name: e.target.value
            })}
          />

          

          <FormInput
            controlid="description"
            caption="Mô tả"
            type="text"
            placeholder="Mô tả sản phẩm"
            value={productRequest.description}
            onChange={(e) => setProductRequest({
              ...productRequest, 
              description: e.target.value
            })}
          />

          <p>Ngày tạo sản phẩm: {productUpdate.createAt}</p>
          <p>Tình trạng: {productUpdate.status === true ? 'Còn hàng' : 'Hết hàng'}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Lưu thay đổi
          </Button>
          {/* Trigger SpecificationModal to open */}
          <Button variant="secondary" onClick={handleSpecificationModalOpen}>
            Thông số kỹ thuật
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pass state to SpecificationModal */}
      <SpecificationModal
        product={productUpdate}
        isOpen={isSpecificationModalOpen}
        onClose={() => setSpecificationModalOpen(false)}
      />
    </>
  );
};

export default ProductUpdateModal;
