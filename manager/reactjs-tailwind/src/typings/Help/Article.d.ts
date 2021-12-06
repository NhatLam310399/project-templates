import { IMongoObjectId } from "common/formatTypes";
import { getAllHelpCenterType } from "./../../redux/actions/help/index";
import { IMongoObjectId } from "typings";

interface IFilterArticle {
  content?: string;
  title?: string;
  idHelpCenterLevel2?: string;
}
export interface IGetArticle {
  page?: int;
  size?: int;
  filterArtical?: IFilterArticle;
}
export interface IArticle {
  _id: IMongoObjectId;
  content: string;
  helpCenterLevel2: IHelpCenterLevel2;
  title: string;
  slug: string;
  keyword: string;
}

export interface IResponeArticle {
  getAllArticle: {
    results: IArticle[];
    total: int;
  };
}
