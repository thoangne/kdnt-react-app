import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Category } from "../../../../../initialize/type";
import FormInput from "../../../../../components/Card/FormInput";
import { openFailNotification, openSuccessNotification } from "../../../../../components/Notification";
import "./CategoryInsertModal.scss";
import { addCategoryAPI } from "../../../../../services/CategoryService";

interface CategoryInsertModalProps {
  onAdd?: (newCategory: Category) => void;
}

const CategoryInsertModal = ({ onAdd }: CategoryInsertModalProps) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState<Category>({
    // categoryId: "", // Chỉ định ID nếu cần, hoặc để trống nếu API tự sinh ID
    categoryName: "",
    description: "",
  });

  console.log({category})

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCategoryInsert = async () => {
    const res = await addCategoryAPI(category)

    if(res && res.data){
      openSuccessNotification("Thêm danh mục mới thành công!", "");
    }
    else{
      openFailNotification("Thêm danh mục mới thất bại!", "");
    }
  };

  return (
    <>
      <Button className="insert-category-btn" onClick={handleShow}>
        Thêm danh mục
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            controlid="category-name"
            caption="Tên danh mục"
            type="text"
            placeholder="Nhập tên danh mục"
            value={category.categoryName}
            onChange={(e) =>
              setCategory({ ...category, categoryName: e.target.value })
            }
          />
          <FormInput
            controlid="description"
            caption="Mô tả"
            type="text"
            placeholder="Mô tả"
            value={category.description}
            onChange={(e) =>
              setCategory({ ...category, description: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleCategoryInsert}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoryInsertModal;
