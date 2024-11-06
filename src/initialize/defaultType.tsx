import  {Product,Category, Login, User, Resgister, FilerObject, Order}  from "./type";

export const CategoryDefault:Category = {
    categoryId: "hello",
    categoryName: "hello",
    description: "hello"
  };
  
export  const orderDefautl: Order = {
    user: {} as User, // giả sử user là một đối tượng trống hoặc bạn có thể định nghĩa nó tùy theo nhu cầu
    province: "",
    district: "",
    ward: "",
    street: ""
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
export const LoginDefalt: Login = {
  username: "",
  password: ""
}

export const ResgisterDefault:Resgister = {
  firstName:"" ,
  lastName:"" ,
  email: "",
  phoneNumber: undefined,
  username:"" ,
  password:"" ,
  gender:""
}

export const UserDefault:User = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  username: "",
  password: "",
  createAt: "",
  status: "",
  roles: "",
  gender:"",
  dayofbirth: ""
}

export const FilerObjectDefault:FilerObject ={
  minPrice: "",
  maxPrice: "",
  color: "",
  size:0,
  subCategory: "",
}

