import { IMongoObjectId, ICustomSizeImages } from "common/typings";
export interface ICategory {
  _id?: IMongoObjectId;
  name: string;
  image?: ICustomSizeImages;
  code?: string;
  value?: string;
  slug?: string;
  language?: string;
}
export interface IGetALlCategories {
  filterCategory?: IFilterCategory;
  page?: number;
  size?: number;
}
export interface IFilterCategory {
  name?: string;
  code?: string;
  slug?: string;
  language?: string;
}
