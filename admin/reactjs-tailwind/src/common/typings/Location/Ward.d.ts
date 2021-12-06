import { IMongoObjectId } from "common/typings";

export interface IWard {
  _id?: IMongoObjectId;
  name: string;
  code?: string;
  unit?: string;
  full_name?: string;
  district_code?: string;
  district_name?: string;
  province_code?: string;
  province_name?: string;
  latitude?: number;
  longitude?: number;
}

export interface IGetWards {
  ward_name?: string;
  name?: string;
  district_code?: string;
  page?: number;
  size?: number;
}

export interface IWardInput {
  name?: string;
  code?: string;
  level?: string;
  unit?: string;
  full_name?: string;
  district_code?: string;
  district_name?: string;
  province_code?: string;
  province_name?: string;
  latitude?: number;
  longitude?: number;
}

export interface IUpdateWards {
  id: IMongoObjectId;
  wardInput: IWardInput;
}
export interface ICreateWards {
  wardInput: IWardInput;
}
export interface IDeleteWard {
  id: IMongoObjectId;
}
