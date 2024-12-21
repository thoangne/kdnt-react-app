import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Category, SubCategory, SubCategoryRequest } from '../../../../../initialize/type';
import { Col, Row } from 'react-bootstrap';
import FormInput from '../../../../../components/Card/FormInput';

import './SubCategoryModal.scss';
// import { addSubCategoryAPI, updateSubCategoryAPI } from '../../../../../services/SubCategoryService';
import { openSuccessNotification } from '../../../../../components/Notification';

interface SubCategoryModalProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

const SubCategoryModal = ({ category, isOpen, onClose }: SubCategoryModalProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [newSubCategory, setNewSubCategory] = useState<SubCategoryRequest>({
    name: '',
    description: '',
    category: { categoryId: category?.categoryId || '' },
  });

  const handleAddSubCategory = () => {
    setIsAdding(true);
  };

  const createNewSubCategory = async () => {
    // const res = await addSubCategoryAPI({ ...newSubCategory, category });
    // if (res && res.data) {
    //   openSuccessNotification("Thêm phân loại thành công!", "");
    //   onClose();
    // }
  };

  const updateSubCategory = async () => {
    // const res = await updateSubCategoryAPI({
    //   ...editingSubCategory,
    //   category: { categoryId: category?.categoryId || '' },
    // });
    // if (res && res.data) {
    //   openSuccessNotification("Cập nhật phân loại thành công!", "");
    //   onClose();
    // }
  };

  const handleEditSubCategory = (subcategory: SubCategory) => {
    setEditingSubCategory(subcategory);
    setIsEditing(true);
  };

  const handleAddClose = () => {
    setIsAdding(false);
    setNewSubCategory({
      name: '',
      description: '',
      category: { categoryId: category?.categoryId || '' },
    });
  };

  const handleEditClose = () => {
    setIsEditing(false);
    setEditingSubCategory(null);
  };

  useEffect(() => {
    if (editingSubCategory) {
      setEditingSubCategory({
        ...editingSubCategory,
        category: { categoryId: category?.categoryId || '' },
      });
    }
  }, [editingSubCategory, category]);

  const renderMainModal = () => (
    <Modal show={isOpen && !isAdding && !isEditing} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Phân loại</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {category?.subCategory?.length ? (
              category.subCategory.map((subcategory) => (
                <tr key={subcategory.subCategoryId}>
                  <td>{subcategory.name}</td>
                  <td>{subcategory.description}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEditSubCategory(subcategory)}>
                      Chỉnh sửa
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Không có phân loại nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleAddSubCategory}>
          Thêm phân loại
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const renderAddSubCategoryModal = () => (
    <Modal show={isAdding} onHide={handleAddClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Phân Loại Mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <FormInput
              controlid="subcategory-name"
              caption="Tên"
              type="text"
              placeholder="Nhập tên"
              value={newSubCategory.name}
              onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="subcategory-description"
              caption="Mô tả"
              type="text"
              placeholder="Nhập mô tả"
              value={newSubCategory.description}
              onChange={(e) => setNewSubCategory({ ...newSubCategory, description: e.target.value })}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAddClose}>
          Quay lại
        </Button>
        <Button variant="primary" onClick={createNewSubCategory}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const renderEditSubCategoryModal = () => (
    <Modal show={isEditing} onHide={handleEditClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh Sửa Phân Loại</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <FormInput
              controlid="subcategory-name"
              caption="Tên"
              type="text"
              placeholder="Nhập tên"
              value={editingSubCategory?.name || ''}
              onChange={(e) =>
                setEditingSubCategory({ ...editingSubCategory!, name: e.target.value })
              }
            />
          </Col>
          <Col md={6}>
            <FormInput
              controlid="subcategory-description"
              caption="Mô tả"
              type="text"
              placeholder="Nhập mô tả"
              value={editingSubCategory?.description || ''}
              onChange={(e) =>
                setEditingSubCategory({ ...editingSubCategory!, description: e.target.value })
              }
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditClose}>
          Quay lại
        </Button>
        <Button variant="primary" onClick={updateSubCategory}>
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {renderMainModal()}
      {renderAddSubCategoryModal()}
      {renderEditSubCategoryModal()}
    </>
  );
};

export default SubCategoryModal;
