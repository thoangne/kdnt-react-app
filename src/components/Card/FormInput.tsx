import React from 'react';
import { Form } from 'react-bootstrap';

interface InputProps {
  controlid: string;
  caption: string;
  type: string;
  placeholder: string;
  value: string; // Ensure value is a string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Specify the correct type for onChange
  meme?: string; // Made meme optional
}

const FormInput: React.FC<InputProps> = ({ controlid, caption, type, placeholder, value, onChange }) => {
  return (
    <Form.Group controlId={controlid}>
      <Form.Label>{caption}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-100 mb-10 btn-input `} // Fixed the syntax here
      />
    </Form.Group>
  );
};

export default FormInput;
