export type subCategory = {
  subCategoryId?: number;
  name?: string;
  description?: string;
};

export type SubCategoryRequest ={
  name: string,
  description: string,
  category:{
      categoryId: string
  }
}

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
  discountPercent?:number,
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
  quantity?: number,
  description?:string,
  createAt?: Date,
  status?: boolean,
  specifications: Specifications,
  subCategory?: subCategory;
};


export type Order = {
  orderId: string,
  orderDate: Date,
    receipDate: Date,
  status: string,
  province: string,
  district: string,
  ward: string,
  street: string,
  user: User,
  orderItem: OrderItem
};

export type OrderItem = {
  quantity: number,
  specifications: Specifications,
  totalPrice: number
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

export type ProductRequest = {
  name?: string,
  description?: string,
  subCategory?: {
      subCategoryId?: number
  }
}

export type SpecificationRequest = {
  id?: number,
  price?: number,
  discountPercent?: number,
  quantity?: number,
  length?: string,
  width?: string,
  height?: string,
  color?: string,
  size?: string,
  product?: {
      productId?: string
  }
}

export type Promotion = {
  promotionId?: string,
  promotionCode?: string,
  discountAmount?: number,
  discountPercentage?: number
  startDate?: Date,
  endDate?: Date,
  updateDate?: Date,
  description?: string,
  status?: boolean
}

export type PromotionProduct = {
  promotionProductId?: string,
  product?: Product,
  promotion?: Promotion
}

export type PromotionProductRequest = {
  product?: Product,
  promotion?: Promotion
}