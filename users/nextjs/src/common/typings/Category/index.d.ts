import { ICustomSizeImages } from "./../App/Images.d";
import { IMongoObjectId } from "@common/typings";

export interface ICategoryLevel1 {
  _id?: IMongoObjectId;
  name?: string;
  description?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategoryLevel2 {
  _id?: IMongoObjectId;
  name?: string;
  icon?: ICustomSizeImages;
  categoryLevel1?: ICategoryLevel1;
  description?: string;
  keywords?: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetCategoryLevel1 {
  FilterCategoryLevel1?: {
    name: string;
  };
  page?: number;
  size?: number;
}

export interface IGetCategoryLevel2 {
  FilterCategoryLevel2?: {
    name?: string;
    categoryLevel1?: string;
  };
  page?: number;
  size?: number;
}
