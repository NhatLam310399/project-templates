import { IProvince, IDistrict, IWard, IMongoObjectId } from "@common/typings";

export interface IStreet {
  _id?: IMongoObjectId;
  name?: string;
  code?: string;
  province?: IProvince;
  district?: IDistrict;
  ward?: IWard;
  slug?: string;
  longitude?: number;
  latitude?: number;
  slugEn?: string;
  nameEn?: string;
  keywords?: string[];
}

export interface IFilterStreetType {
  name?: string;
  province?: string;
  district?: string;
  country?: string;
  ward?: string;
}
export interface IStreetTypeInput {
  name?: string;
  code?: string;
  province?: string;
  district?: string;
  country?: string;
  ward?: string;
  longitude?: number;
  latitude?: number;
  slugEn?: string;
  nameEn?: string;
}

export interface IGetStreet {
  filterStreetType: IFilterStreetType;
  page?: number;
  size?: number;
}

export interface ICreateStreet {
  input: IStreetTypeInput;
}

export interface IUpdateStreet {
  id: IMongoObjectId;
  input: IStreetTypeInput;
}

export interface IDeleteStreet {
  id: IMongoObjectId;
}
