import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// Định nghĩa kiểu Category
interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
}

interface DropdownFormProps {
  items: Category[]; // Mảng các đối tượng Category
  value: string; // Giá trị hiển thị trên button
  onSelect: (categoryId: string) => void; // Hàm xử lý khi chọn một mục
}

const DropdownForm: React.FC<DropdownFormProps> = ({ items, value, onSelect }) => {
  return (
    <DropdownButton id="dropdown-basic-button" title={value}>
      {items.map((item, index) => (
        <Dropdown.Item 
          key={index} 
          onClick={() => onSelect(item.categoryId)} // Gọi hàm xử lý khi nhấp
        >
          {item.categoryName}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default DropdownForm;
