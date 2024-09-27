export type Category = {
    categoryId?: string;
    categoryName?: string;
    description?: string;
  };
  
export type Product = {
  productId?: string;
  name?: string;
  price?: number;
  length?:string,
  width?:string,
  height?:string,
  description?:string,
  stockQuantity?: number;
  createAt?: Date;
  status?: boolean;
  category?: Category;
};

export type User = {
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  username: string,
  // password: string,
  createAt: Date,
  status: boolean,
  roles: string
}

export type Login = {
  username?: string;
  password?: string;
}

export type Banner = {
  name?:string;
}