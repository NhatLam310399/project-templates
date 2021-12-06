import { IMongoObjectId, ICustomSizeImages } from "typings";

export interface ICategoryLevel1 {
  _id?: IMongoObjectId;
  name?: string;
  image?: ICustomSizeImages;
  tag?: string;
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetAllCategoryLevel1 {
  filterCategoryLevel1?: {
    name?: string;
    tag?: string;
  };
  page?: number;
  size?: number;
}
