import { IMongoObjectId, ICustomSizeImages, ICategoryLevel1 } from "typings";
export interface ITagMenu {
  _id?: IMongoObjectId;
  name?: string;
  image?: ICustomSizeImages;
  categoryLevel1?: ICategoryLevel1;
  hasCategoryLevel2?: boolean;
  isLongImage?: boolean;
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IFilterTagMenu {
  name?: string;
  idCategoryLevel1?: string;
}
export interface IGetAllTagMenu {
  filterTagMenu?: IFilterTagMenu;
  page?: number;
  size?: number;
}
