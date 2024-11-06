export type subCategory = {
  subCategoryId?: number;
  name?: string;
  description?: string;
};

export type Category = {
    categoryId?: string;
    categoryName?: string;
    description?: string;
    subCategory?: subCategory
  };

export type Image = {
  imageId?: number,
  imageName?: string,
  imageData?:string,
  imageType?: string
}
export type Specifications = {
  id?: number;
  price?: number;
  quantity?:number,
  color: string,
  height?: string,
  width?: string,
  length?: string,
  size?: string
  image: Image
};

export type Product = {
  productId?: string,
  name?: string,
  description?:string,
  createAt?: Date,
  status?: boolean,
  specifications: Specifications
};

export type Order = {
  user: User,
  province: string,
  district: string,
  ward: string,
  street: string
};

export type OrderItem = {
  quantity: number,
  specifications: Specifications,
  order: Order
}

export type User = {
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number,
  username: string,
  password: string,
  createAt: Date,
  status: boolean,
  roles: string,
  gender:string
  dayofbirth: Date
}

export type Login = {
  username: string;
  password: string;
}

export type Banner = {
  name?:string;
}

export type Resgister ={
  firstName?: string,
  lastName?: string,
  email?: string,
  phoneNumber?: number,
  username?: string,
  password?: string,
  gender?:string
}

export type FilterObject ={
  minPrice?: number[],
  maxPrice?: number[],
  color?: string[],
  size?: string[],
  subCategory?: number[],
}

export type MyInFo = {
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number,
  username: string,
  password: string,
  createAt: Date,
  status: boolean,
  roles: string,
}


export type ShoppingCart = {
    productCartId: string,
    createAt?: Date,
    quantity?: number,
    price?: number,
    productName?: string,
    specifications?: Specifications
}