import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Product, Specification, SpecificationRequest } from '../../../../../initialize/type';
import { Col, Row } from 'react-bootstrap';
import FormInput from '../../../../../components/Card/FormInput';

import './SpecificationModal.scss';
import { SpecificationRequestDefault, specificationsDefault } from '../../../../../initialize/defaultType';
import { addSpecificationAPI, updateSpecificationAPI } from '../../../../../services/SpecificationsService';
import { openSuccessNotification } from '../../../../../components/Notification';

interface SpecificationModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const SpecificationModal = ({ product, isOpen, onClose }: SpecificationModalProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSpecification, setNewSpecification] = useState<SpecificationRequest>(SpecificationRequestDefault);

  const [editingSpecification, setEditingSpecification] = useState<Specification | null>(null);

  const [updateSpecificationRequest, setUpdateSpecificationRequest] = useState<SpecificationRequest>(SpecificationRequestDefault)
  console.log("teesst 11111" + JSON.stringify(updateSpecificationRequest));
  const handleAddSpecification = () => {
    // Switch to the adding form state
    setIsAdding(true);
  };

  
  const createNewSpecification = async() => {
    const res = await addSpecificationAPI(newSpecification);
    if(res && res.data){
      openSuccessNotification("Thêm thông số kỹ thuật thành công!", "");
    }
    return;
  }

  const updateSpecification = async() =>{
    const res = await updateSpecificationAPI(updateSpecificationRequest);
    if(res && res.data){
      openSuccessNotification("Cập nhật thông số kỹ thuật thành công!", "");
    }
  }
  const handleEditSpecification = (specification: Specification) => {
    setEditingSpecification(specification);
    setIsEditing(true);
  };

  const handleAddClose = () => {
    // Close the adding form and return to the main modal
    setIsAdding(false);
    setNewSpecification({
      id: editingSpecification.id,
      color: '',
      price: 0,
      discountPercent: 0,
      quantity: 0,
      size: '',
      height: '',
      width: '',
      length: '',
      images: [],
    });
  };

  useEffect(() => {
    if (editingSpecification) {
      setUpdateSpecificationRequest({
        id: editingSpecification.id,
        price: editingSpecification.price,
        discountPercent: editingSpecification.discountPercent,
        quantity: editingSpecification.quantity,
        length: editingSpecification.length,
        width: editingSpecification.width,
        height: editingSpecification.height,
        color: editingSpecification.color,
        size: editingSpecification.size,
        product: {
          productId: product.productId,
        },
      });
    }
  }, [editingSpecification]);

  useEffect(() => {
    if (product.productId) {
      setNewSpecification((prevSpecification) => ({
        ...prevSpecification,  // Giữ nguyên các giá trị cũ
        product: {
          productId: product.productId  // Chỉ cập nhật productId nếu nó có giá trị
        }
      }));
    }
  }, [product]); // Khi product thay đổi, useEffect sẽ được gọi lại
  
  

  const handleEditClose = () => {
    // Close the editing form and return to the main modal
    setIsEditing(false);
    setEditingSpecification(null);
  };

  const handleSaveSpecification = () => {
    if (editingSpecification) {
      // Update existing specification
      console.log('Updated Specification:', editingSpecification);
    } else {
      // Save the new specification
      console.log('New Specification:', newSpecification);
    }
    setIsAdding(false); // Close the modal after saving
    setIsEditing(false);
  };

  const renderMainModal = () => (
    <Modal show={isOpen && !isAdding && !isEditing} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thông số kỹ thuật</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Màu sắc</th>
              <th>Giá</th>
              <th>Giảm giá</th>
              <th>Số lượng</th>
              <th>Kích thước</th>
              <th>Chiều cao</th>
              <th>Chiều rộng</th>
              <th>Chiều dài</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {product.specifications.map((specification) => (
              <tr key={specification.id}>
                <td>
                  <div className="image-gallery">
                    {specification.images && specification.images.length > 0 ? (
                      specification.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${specification.color} - ${index + 1}`}
                          style={{
                            width: '70px',
                            height: 'auto',
                            margin: '5px',
                            borderRadius: '5px',
                            objectFit: 'cover',
                          }}
                        />
                      ))
                    ) : (
                      'Không có hình ảnh'
                    )}
                  </div>
                </td>
                <td>{specification.color}</td>
                <td>{specification.price}</td>
                <td>{specification.discountPercent ? specification.discountPercent : 0}</td>
                <td>{specification.quantity}</td>
                <td>{specification.size}</td>
                <td>{specification.height}</td>
                <td>{specification.width}</td>
                <td>{specification.length}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEditSpecification(specification)}>
                    Chỉnh sửa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleAddSpecification}>
          Thêm thông số
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const renderAddSpecificationModal = () => (
    <Modal show={isAdding} onHide={handleAddClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Thông Số Mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <FormInput
              controlid="specification-color"
              caption="Màu sắc"
              type="text"
              placeholder="Nhập màu sắc"
              value={newSpecification.color}
              onChange={(e) => setNewSpecification({ ...newSpecification, color: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-price"
              caption="Giá"
              type="number"
              placeholder="Nhập giá"
              value={newSpecification.price || ''}
              onChange={(e) => setNewSpecification({ ...newSpecification, price: parseFloat(e.target.value) })}
            />
          </Col>
        </Row>

        
        <Row>
          <Col md={6}>
            <FormInput
              controlid="specification-quantity"
              caption="Số lượng"
              type="number"
              placeholder="Nhập số lượng"
              value={newSpecification.quantity || ''}
              onChange={(e) => setNewSpecification({ ...newSpecification, quantity: parseInt(e.target.value, 10) })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-size"
              caption="Kích thước"
              type="text"
              placeholder="Nhập kích thước"
              value={newSpecification.size}
              onChange={(e) => setNewSpecification({ ...newSpecification, size: e.target.value })}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormInput
              controlid="specification-height"
              caption="Chiều cao"
              type="text"
              placeholder="Nhập chiều cao"
              value={newSpecification.height}
              onChange={(e) => setNewSpecification({ ...newSpecification, height: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-width"
              caption="Chiều rộng"
              type="text"
              placeholder="Nhập chiều rộng"
              value={newSpecification.width}
              onChange={(e) => setNewSpecification({ ...newSpecification, width: e.target.value })}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormInput
              controlid="specification-length"
              caption="Chiều dài"
              type="text"
              placeholder="Nhập chiều dài"
              value={newSpecification.length}
              onChange={(e) => setNewSpecification({ ...newSpecification, length: e.target.value })}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAddClose}>
          Quay lại
        </Button>
        <Button variant="primary" onClick={createNewSpecification}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const renderEditSpecificationModal = () => (
    <Modal show={isEditing} onHide={handleEditClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh Sửa Thông Số</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <FormInput
              controlid="specification-color"
              caption="Màu sắc"
              type="text"
              placeholder="Nhập màu sắc"
              value={editingSpecification?.color || ''}
              onChange={(e) => setEditingSpecification({ ...editingSpecification!, color: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-price"
              caption="Giá"
              type="number"
              placeholder="Nhập giá"
              value={editingSpecification?.price || ''}
              onChange={(e) => setEditingSpecification({ ...editingSpecification!, price: parseFloat(e.target.value) })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-discountPercent"
              caption="Giảm giá (%)"
              type="number"
              placeholder="Nhập % giảm giá"
              value={editingSpecification?.discountPercent || 0}
              onChange={(e) => setEditingSpecification({ ...editingSpecification!, discountPercent: parseFloat(e.target.value) })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-quantity"
              caption="Số lượng"
              type="number"
              placeholder="Nhập số lượng"
              value={editingSpecification?.quantity || ''}
              onChange={(e) => setEditingSpecification({ ...editingSpecification!, quantity: parseInt(e.target.value, 10) })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-size"
              caption="Kích thước"
              type="text"
              placeholder="Nhập kích thước"
              value={editingSpecification?.size || ''}
              onChange={(e) => setEditingSpecification({ ...editingSpecification!, size: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-height"
              caption="Chiều cao"
              type="text"
              placeholder="Nhập chiều cao"
              value={editingSpecification?.height || ''}
              onChange={(e) => setEditingSpecification({ ...editingSpecification!, height: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-width"
              caption="Chiều rộng"
              type="text"
              placeholder="Nhập chiều rộng"
              value={editingSpecification?.width || ''}
              onChange={(e) => setEditingSpecification({ ...editingSpecification!, width: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="specification-length"
              caption="Chiều dài"
              type="text"
              placeholder="Nhập chiều dài"
              value={editingSpecification?.length || ''}
              onChange={(e) => setEditingSpecification({ ...editingSpecification!, length: e.target.value })}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditClose}>
          Quay lại
        </Button>
        <Button variant="primary" onClick={updateSpecification}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {renderMainModal()}
      {renderAddSpecificationModal()}
      {renderEditSpecificationModal()}
    </>
  );
};

export default SpecificationModal;

