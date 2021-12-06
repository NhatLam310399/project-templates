import { IMongoObjectId } from "../App";

export interface ILevelPrice {
  _id?: IMongoObjectId;
  displayName?: string;
  priceFrom?: number;
  priceTo?: number;
  language?: string;
  slug?: string;
  customSlug?: string;
  keywords?: string;
}

export interface IFilterLevelPrice {
  displayName?: string;
  language?: string;
}

export interface IGetAllLevelPrice {
  filterLevelPrice?: IFilterLevelPrice;
  page?: number;
  size?: number;
}
