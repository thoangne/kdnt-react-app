import  {Product,Category}  from "./type";

export const CategoryDefault:Category = {
    categoryId: "hello",
    categoryName: "hello",
    description: "hello"
  };
  
export const ProductDefault: Product = {
  productId: "xxxxxxxxx",
  name: "hello",
  price: 0,
  length:"hello",
  width:"hello",
  height:"hello",
  description:"hello",
  stockQuantity: 0,
  createAt: "2024-1-1",
  status: false,
  category: CategoryDefault
};