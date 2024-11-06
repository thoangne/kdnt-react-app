// List.tsx

import { useEffect, useState } from "react";
import { searchProduct } from "../../services/ProductService";
import { Product } from "../../initialize/type";
import "./List.scss";
import { Link } from "react-router-dom";

interface ListProps {
  input: string;
  onSelect: (productId: string, name: string) => void;
}

function List({ input, onSelect }: ListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>();

  const searchProductHandler = async (keyword: string) => {
    try {
      const res = await searchProduct(keyword);
      if (res && res.data.products) {
        setProducts(res.data.products);
        setQuantity(res.data.quantity);
      } else {
        setProducts([]);
        console.log("No products found or invalid data format.");
      }
    } catch (error) {
      console.error("Error while searching for products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    if (input) {
      searchProductHandler(input);
    } else {
      setProducts([]);
    }
  }, [input]);

  // Limit to the first 4 products
  const filteredData = products
    .filter((el) => el.name?.toLowerCase().includes(input))
    .slice(0, 4); // Only take the first 4 items

  return (
    <ul className="dropdown-list">
      {filteredData.map((item) => (
        <Link to={`/product-detail/${item.productId}`}>
           <li
              key={item.productId}
              onClick={() => onSelect(item.productId!, item.name!)}
              className="dropdown-item"
            >
          {item.name}
        </li>
        </Link>
      ))}
     {quantity && quantity > 4 ? (
          <p>
            Xem thêm {quantity - 4} sản phẩm
          </p>
        ) : (
          <p>Kết quả tìm kiếm là: {quantity} sản phẩm</p>
        )}
    </ul>
    
  );
}

export default List;
