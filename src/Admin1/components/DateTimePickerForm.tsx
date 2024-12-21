import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

interface DateTimePickerFormProps {
  label?: string; // Label cho DateTimePicker
  onDateChange: (value: string | null) => void; // Callback gửi dữ liệu ISO về thẻ cha
}

const DateTimePickerForm: React.FC<DateTimePickerFormProps> = ({ label, onDateChange }) => {
  const handleChange = (newValue: Dayjs | null) => {
    // Chuyển đổi sang định dạng "yyyy-MM-dd'T'HH:mm:ss" (không có 'Z')
    const formattedValue = newValue ? newValue.format('DD-MM-YYYY HH:mm:ss') : null;
    onDateChange(formattedValue); // Gửi giá trị ISO hợp lệ về thẻ cha
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label={label} onChange={handleChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};


export default DateTimePickerForm;
