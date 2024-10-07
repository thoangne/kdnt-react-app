import  {Product,Category, Filter}  from "./type";

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

export const FilterDefault: Filter = {
  minPrice: null,
  maxPrice: null,
  color: null,
  size: null,
  subCategory: null
}


export const ListCategoryDefault: Category[] = [
  {
    categoryId: "cat01",
    categoryName: "Electronics",
    description: "Devices, gadgets and accessories",
  },
  {
    categoryId: "cat02",
    categoryName: "Clothing",
    description: "Men's and women's apparel",
  },
  {
    categoryId: "cat03",
    categoryName: "Home & Garden",
    description: "Furniture, decor, and gardening tools",
  },
  {
    categoryId: "cat04",
    categoryName: "Sports",
    description: "Sports equipment and apparel",
  },
  {
    categoryId: "cat05",
    categoryName: "Toys",
    description: "Children's toys and games",
  },
];