import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormInput from '../../../components/Card/FormInput';
import { Promotion } from '../../../initialize/type';
import DateTimePickerForm from '../../components/DateTimePickerForm';
import dayjs, { Dayjs } from 'dayjs';
import { addPromotionAPI } from '../../../services/PromotionService';
import { openFailNotification, openSuccessNotification } from '../../../components/Notification';


function PromotionInsertModal() {
  const [show, setShow] = useState(false);

  const [promotion, setPromotion] = useState<Promotion>();

  console.log("ooooooooooo" + JSON.stringify(promotion));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    // Cập nhật ngày/giờ bắt đầu
    const handleDateChange = (key: 'startDate' | 'endDate') => (value: string | null) => {
      setPromotion((prev) => ({
        ...prev,
        [key]: value, // Cập nhật startDate hoặc endDate
      }));
    };


    const addPromotion = async() => {
      if(promotion){
        const res = await addPromotionAPI(promotion);
        if(res && res.data){
          openSuccessNotification("Thêm mã khuyến mãi mới thành thông!","");
        }else{
          openFailNotification("Thêm mã khuyến mãi mới thất bại!","")
        }
      }
    }
    

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Tạo khuyến mãi
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm khuyến mãi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormInput
            controlid="promotion-code"
            caption="Code"
            type="text"
            placeholder="Nhập code"
            value={promotion?.promotionCode}
            onChange={(e) =>
              setPromotion({
                ...promotion,
                promotionCode: e.target.value,
              })
            }/>

        <FormInput
            controlid="discount-amount"
            caption="Giảm giá tối đa"
            type="number"
            placeholder="Nhập số tiền"
            value={promotion?.discountAmount}
            onChange={(e) =>
              setPromotion({
                ...promotion,
                discountAmount: Number(e.target.value),
              })
            }/>

        <FormInput
            controlid="promotion-percent"
            caption="Phần trăm (%)"
            type="number"
            placeholder="Nhập phần trăm(%)"
            value={promotion?.discountPercentage}
            onChange={(e) =>
              setPromotion({
                ...promotion,
                discountPercentage: Number(e.target.value),
              })
            }/>

          <FormInput
            controlid="description"
            caption="Mô tả xxx"
            type="text"
            placeholder="Nhập mô tả"
            value={promotion?.description}
            onChange={(e) =>
              setPromotion({
                ...promotion,
                description: e.target.value,
              })
            }/>

        <DateTimePickerForm
            label="Ngày bắt đầu"
            onDateChange={handleDateChange('startDate')}/>

        <DateTimePickerForm
            label="Ngày kết thúc"
            onDateChange={handleDateChange('endDate')}/>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPromotion}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PromotionInsertModal;