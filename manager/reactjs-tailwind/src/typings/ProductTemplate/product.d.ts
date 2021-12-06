import { IMongoObjectId, ICustomSizeImages, ICategoryLv1, ICategoryLv2, IColor } from "typings"
export interface IProduct {
  _id?: IMongoObjectId;
  size?: ISize[];
  sizeFromTo?: string
  color?: IColor[];
  orderDiscount?: number
  name?: string
  code?: string
  categoryLevel1?: ICategoryLv1
  categoryLevel2?: ICategoryLv2
  price?: number
  image?: ICustomSizeImages
  description1?: string
  description2?: string
  isBestSeller?: boolean
  numberOfRating?: number
  numberOfReview?: number
  slug?: string
  keywords?: string
  createdAt?: Date
  updatedAt?: Date

}
export interface IFilterProduct {
  name?: string;
  idCategoryLevel1?: String
  idCategoryLevel2?: String
  idTagMenu?: String
}
export interface IGetAllProduct {
  filterProduct?: IFilterProduct
  page?: number
  size?: number
}

export interface ISize {
  _id?: IMongoObjectId
  size?: string
  length?: string
  chest?: string
  sleeveLength?: string
  slug?: string
  keywords?: string
  createdAt?: Date
  updatedAt?: Date
}