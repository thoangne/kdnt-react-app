import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ProductUpdateModal(product: Product) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductUpdateModal;