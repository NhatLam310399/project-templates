import {
  IMongoObjectId,
  ICustomSizeImages,
  ICategoryLv1,
  ICategoryLevel2,
  IColor,
} from "typings";

export interface IProduct {
  _id?: IMongoObjectId;
  size?: string[];
  sizeFromTo?: string;
  color?: IColor;
  orderDiscount?: number;
  name?: string;
  code?: string;
  categoryLevel1?: ICategoryLv1;
  categoryLevel2?: ICategoryLevel2;
  price?: number;
  image?: ICustomSizeImages;
  description1?: string;
  description2?: string;
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IFilterProduct {
  name?: string;
  idCategoryLevel1?: String;
  idCategoryLevel2?: String;
  idTagMenu?: String;
}
export interface IGetAllProduct {
  filterProduct?: IFilterProduct;
  page?: number;
  size?: number;
}
