import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormInput from '../../../components/Card/FormInput';
import { Promotion } from '../../../initialize/type';
import DateTimePickerForm from '../../components/DateTimePickerForm';
import { openFailNotification, openSuccessNotification } from '../../../components/Notification';

import { confirm } from '../../components/common/confirm/confirm';
import { updatePromotionAPI } from '../../../services/PromotionService';

function PromotionUpdateModal({ promotionProp }: { promotionProp: Promotion }) {
  const [show, setShow] = useState(false);
  const [promotion, setPromotion] = useState<Promotion>(promotionProp);
  const [promotionId, setPromotionId] = useState<string>();

  // Đồng bộ hóa state `promotion` với prop `promotionProp`
  useEffect(() => {
    if (promotionProp) {
      setPromotion(promotionProp);
    setPromotionId(promotionProp.promotionId)

    }
  }, [promotionProp]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Cập nhật ngày/giờ bắt đầu hoặc kết thúc
  const handleDateChange = (key: 'startDate' | 'endDate') => (value: string | null) => {
    setPromotion((prev) => ({
      ...prev,
      [key]: value, // Cập nhật startDate hoặc endDate
    }));
  };



  const updatePromotionConfirm = async () => {
    handleClose();
    if (await confirm({confirmation: "Bạn muốn cập nhật thông tin sản phẩm?"})) {
        updatePromotion();
    }
    return;
  };
  const updatePromotion = async() => {
    if(promotion && promotionId){
        const res = await updatePromotionAPI(promotionId, promotion);
        if(res){
            openSuccessNotification("Cập nhật thông tin khuyến mãi thành công!", "")
        }else{
            openFailNotification("Cập nhật thông tin sản phẩm thất bại!", "");
        }
    }
  }



  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cập nhật
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật mã khuyến mãi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            controlid="promotion-code"
            caption="Code"
            type="text"
            placeholder="Nhập code"
            value={promotion?.promotionCode || ''}
            onChange={(e) =>
              setPromotion((prev) => ({
                ...prev,
                promotionCode: e.target.value,
              }))
            }
          />

          <FormInput
            controlid="discount-amount"
            caption="Giảm giá tối đa"
            type="number"
            placeholder="Nhập số tiền"
            value={promotion?.discountAmount || 0}
            onChange={(e) =>
              setPromotion((prev) => ({
                ...prev,
                discountAmount: Number(e.target.value),
              }))
            }
          />

          <FormInput
            controlid="promotion-percent"
            caption="Phần trăm (%)"
            type="number"
            placeholder="Nhập phần trăm (%)"
            value={promotion?.discountPercentage || 0}
            onChange={(e) =>
              setPromotion((prev) => ({
                ...prev,
                discountPercentage: Number(e.target.value),
              }))
            }
          />

          <FormInput
            controlid="description"
            caption="Mô tả"
            type="text"
            placeholder="Nhập mô tả"
            value={promotion?.description || ''}
            onChange={(e) =>
              setPromotion((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />

          <DateTimePickerForm
            label="Ngày bắt đầu"
            onDateChange={handleDateChange('startDate')}
          />

          <DateTimePickerForm
            label="Ngày kết thúc"
            onDateChange={handleDateChange('endDate')}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={updatePromotionConfirm}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PromotionUpdateModal;
