import {
  IProvince,
  IDistrict,
  IWard,
  ICountry,
  IMongoObjectId,
} from "common/typings";

export interface IStreet {
  _id?: string;
  name?: string;
  code?: string;
  province?: IProvince;
  district?: IDistrict;
  country?: ICountry;
  ward?: IWard;
  slug?: string;
  longitude?: number;
  latitude?: number;
  slugEn?: string;
  nameEn?: string;
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
  province: string;
  district: string;
  country?: string;
  ward: string;
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
  input: IFilterStreetType;
}

export interface IDeleteStreet {
  id: IMongoObjectId;
}
