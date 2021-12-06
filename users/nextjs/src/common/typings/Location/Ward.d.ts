import { IMongoObjectId } from "@common/typings";

export interface IWard {
  _id?: IMongoObjectId;
  name?: string;
  code?: string;
  unit?: string;
  full_name?: string;
  districtCode?: string;
  districtName?: string;
  provinceCode?: string;
  provinceName?: string;
  latitude?: number;
  longitude?: number;
}

export interface IGetWards {
  name?: string;
  districtCode?: string;
  page?: number;
  size?: number;
}

export interface IWardInput {
  name?: string;
  code?: string;
  level?: string;
  unit?: string;
  full_name?: string;
  districtCode?: string;
  districtName?: string;
  provinceCode?: string;
  provinceName?: string;
  latitude?: number;
  longitude?: number;
}

export interface IUpdateWards {
  id: IMongoObjectId;
  input: IWardInput;
}
