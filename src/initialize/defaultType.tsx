import  {Product,Category, Login, User, Resgister, FilerObject, Order, Specifications}  from "./type";

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
  name: "",
  description:"",
  createAt: undefined,
  status: false,
  specifications: null
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


export const specificationsDefault: Specifications = {
  price: 0,
  quantity: 0,
  color: '',
  height: '',
  width: '',
  length: '',
  size: '',
  image: null, // Nếu `image` là chuỗi
};
