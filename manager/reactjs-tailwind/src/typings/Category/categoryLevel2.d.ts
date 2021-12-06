import { IMongoObjectId, ICustomSizeImages, ITagMenu } from "typings";

export interface ICategoryLevel2 {
  _id?: IMongoObjectId;
  name?: string;
  image?: ICustomSizeImages;
  slug?: string;
  tagMenu?: ITagMenu;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGetAllCategoryLevel2 {
  filterCategoryLevel2?: {
    name?: string;
    tagMenu?: string;
  };
  page?: number;
  size?: number;
}
