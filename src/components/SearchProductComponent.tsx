import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { searchProduct } from '../services/ProductService';
import { Product } from '../initialize/type';


export const SearchProductComponent = () => {
  const [listProduct, setListProduct] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const searchProductHandler = async (keyword: string | null) => {
      const res = await searchProduct(keyword);
      console.log("XXXXXXXXXXXXX1121212" + JSON.stringify(res.data.products));
      if (res && res.data && res.data.products) {
        // Transform the product list to include label
        const productsWithLabels = res.data.products.map((product: Product) => ({
          value: product.id, // or product.productId
          label: product.name, // or any field that should be displayed
        }));
        setListProduct(productsWithLabels);
      }
    };

    searchProductHandler("Tủ Quần Áo Gỗ MOHO");
  }, []);


  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={listProduct[0]}
        name="product"
        options={listProduct}
      />
    </>
  );
};
