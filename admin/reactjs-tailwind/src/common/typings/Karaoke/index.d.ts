import {
  IPlaceCreateInput,
  IPlaceUpdateInput,
  IFilterPlace,
} from "common/typings";
import { IPlace } from "../Place";

export interface IKaraoke extends IPlace {}
export interface ICreateKaraoke {
  placeCreateInput: IPlaceCreateInput;
}
export interface IUpdateKaraoke {
  id: string;
  placeUpdateInput: IPlaceUpdateInput;
}
export interface IGetAllKaraoke {
  filterPlace?: IFilterPlace;
  page?: number;
  size?: number;
}
export interface IGetAllKaraokeHighlight {
  filterPlace?: IFilterPlace;
  page?: number;
  size?: number;
}
