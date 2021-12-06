import { IMongoObjectId } from "common/typings";

export interface IWard {
  _id?: string;
  name?: string;
  code?: string;
  district_code?: string;
  district_name?: string;
  province_code?: string;
  province_name?: string;
  slug?: string;
  level?: string;
  longitude?: number;
  latitude?: number;
  slugEn?: string;
  nameEn?: string;
}

export interface IWardInput {
  name?: string;
  code?: string;
  level?: string;
  district_code?: string;
  district_name?: string;
  province_code?: string;
  province_name?: string;
  longitude?: number;
  latitude?: number;
  slugEn?: string;
  nameEn?: string;
}

export interface IGetWards {
  name?: string;
  district_code?: string;
  page?: number;
  size?: number;
}

export interface IUpdateWards {
  id: IMongoObjectId | null;
  input: IWardInput;
}
