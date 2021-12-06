import { IMongoObjectId } from "common/formatTypes";
import { getAllHelpCenterType } from "./../../redux/actions/help/index";
import { IMongoObjectId } from "typings";

export interface IFilterHelpCenterLevel1 {
  nameCategoryLevel1: string;
}
export interface IGetHelpCenterLevel1 {
  page?: int;
  size?: int;
  filterHelpCenterLevel1?: IFilterHelpCenterLevel1;
}

export interface IImage {
  medium: string;
  default: string;
  small: string;
}
export interface IHelpCenterLevel1 {
  _id: IMongoObjectId;
  nameCategoryLevel1: string;
  slug: string;
  keywords: string;
  image: IImage;
}

export interface IResponeHelpCenterLevel1 {
  getAllHelpCenterLevel1: {
    results: IHelpCenterType[];
    total: int;
  };
}
