import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Category } from "../../../../../initialize/type";
import FormInput from "../../../../../components/Card/FormInput";
import { openFailNotification, openSuccessNotification } from "../../../../../components/Notification";
import { updateCategoryAPI } from "../../../../../services/CategoryService";
import { confirm } from "../../../../components/common/confirm/confirm";
import { MdOutlineEditCalendar } from "react-icons/md";
import "./CategoryUpdateModal.scss";
import SubCategoryModal from "./SubCategoryModal";

interface CategoryUpdateModalProps {
  category: Category;
  onUpdate?: (updatedCategory: Category) => void;
}

const CategoryUpdateModal = ({ category, onUpdate }: CategoryUpdateModalProps) => {
  const [show, setShow] = useState(false);
  const [categoryUpdate, setCategoryUpdate] = useState<Category>(category);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [isSpecificationModalOpen, setSpecificationModalOpen] = useState(false);

  const handleCategoryUpdate = async () => {
    try {
      if (categoryUpdate.categoryId) {
        const response = await updateCategoryAPI(categoryUpdate.categoryId, categoryUpdate);
        if (response?.data) {
          openSuccessNotification("Category updated successfully", "");
          onUpdate?.(response.data); // Optional callback for parent to handle updates
        } else {
          openFailNotification("Category update failed", "");
        }
      }
    } catch (error) {
      openFailNotification("Error occurred while updating category", error.message);
    }
  };

  const handleConfirm = async () => {
    handleClose();
    if (await confirm({ confirmation: "Are you sure you want to update this category?" })) {
      handleCategoryUpdate();
    }
  };

  const handleSpecificationModalOpen = () => {
    setSpecificationModalOpen(true);
    setShow(false); // Close ProductUpdateModal when SpecificationModal opens
  };
  return (
    <>
      <Button className="edit-product-btn" onClick={handleShow}>
        <MdOutlineEditCalendar />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            controlid="category-id"
            caption="Category ID"
            type="text"
            value={categoryUpdate.categoryId || ""}
            disabled
          />
          <FormInput
            controlid="category-name"
            caption="Category Name"
            type="text"
            placeholder="Enter category name"
            value={categoryUpdate.categoryName}
            onChange={(e) =>
              setCategoryUpdate({ ...categoryUpdate, categoryName: e.target.value })
            }
          />
          <FormInput
            controlid="description"
            caption="Description"
            type="text"
            placeholder="Enter description"
            value={categoryUpdate.description}
            onChange={(e) =>
              setCategoryUpdate({ ...categoryUpdate, description: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleSpecificationModalOpen}>
            Danh mục con
          </Button>
        </Modal.Footer>
      </Modal>

      <SubCategoryModal
        category={categoryUpdate}
        isOpen={isSpecificationModalOpen}
        onClose={() => setSpecificationModalOpen(false)}
      />
    </>
  );
};

export default CategoryUpdateModal;
