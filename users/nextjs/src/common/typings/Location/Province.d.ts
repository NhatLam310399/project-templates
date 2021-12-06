import { IMongoObjectId } from "@common/typings";

export interface IProvince {
  _id?: IMongoObjectId;
  name?: string;
  code?: string;
  countryCode?: string;
  slug?: string;
  level?: string;
  latitude?: number;
  longitude?: number;
  slugEn?: string;
  nameEn?: string;
}

export interface IGetProvince {
  name?: string;
  page?: number;
  size?: number;
}

export interface IProvinceInput {
  name?: string;
  code?: string;
  unit?: string;
  latitude?: number;
  longitude?: number;
}

export interface IUpdateProvince {
  id: IMongoObjectId;
  input: IProvinceInput;
}
