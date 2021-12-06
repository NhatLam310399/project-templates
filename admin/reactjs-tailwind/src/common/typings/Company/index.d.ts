import {
  IPlaceCreateInput,
  IPlaceUpdateInput,
  IPlace,
  IFilterPlace,
} from "common/typings";

export interface ICompany extends IPlace {}
export interface ICreateCompany {
  placeCreateInput: IPlaceCreateInput;
}
export interface IUpdateCompany {
  id: string;
  placeUpdateInput: IPlaceUpdateInput;
}
export interface IGetAllCompany {
  filterPlace?: IFilterPlace;
  page?: number;
  size?: number;
}
export interface IGetAllCompanyHighlight {
  filterPlace?: IFilterPlace;
  page?: number;
  size?: number;
}
