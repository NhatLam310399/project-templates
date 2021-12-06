import { IMongoObjectId } from "common/formatTypes";
import { getAllHelpCenterType } from "./../../redux/actions/help/index";
import { IMongoObjectId } from "typings";

interface IFilterHelpCenterLevel2 {
  nameCategoryLevel2?: string;
  helpCenterLevel1?: string;
  description?: string;
}
export interface IGetHelpCenterLevel2 {
  page?: int;
  size?: int;
  filterHelpCenterLevel2?: IFilterHelpCenterLevel2;
}
export interface IHelpCenterLevel2 {
  _id: IMongoObjectId;
  helpCenterLevel1: IHelpCenterLevel1;
  nameCategoryLevel2: string;
  description: string;
  slug: string;
  keyword: string;
}

export interface IResponeHelpCenterLevel2 {
  getAllHelpCenterLevel2: {
    results: IHelpCenterLevel2[];
    total: int;
  };
}
