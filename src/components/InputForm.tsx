import { useState } from 'react';
import { Placeholder as BootstrapPlaceholder } from 'react-bootstrap'; // Đổi tên import nếu cần

interface InputFormProps {
  placeholder: string; // Định nghĩa props cho placeholder
}

export default function InputForm({ placeholder }: InputFormProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form>
      <label>
        Input Value:
        <input
          placeholder={placeholder} // Sử dụng placeholder từ props
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
      <p>Input Value: {inputValue}</p>
    </form>
  );
}
