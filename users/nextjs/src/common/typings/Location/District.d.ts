import { IMongoObjectId } from "@common/typings";

export interface IDistrict {
  _id?: IMongoObjectId;
  name?: string;
  code?: string;
  unit?: string;
  full_name?: string;
  provinceName?: string;
  provinceCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface IGetDistricts {
  name?: string;
  page?: number;
  size?: number;
  provinceCode?: string;
}

export interface IDistrictInput {
  name?: string;
  code?: string;
  unit?: string;
  full_name?: string;
  provinceName?: string;
  provinceCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface IUpdateDistrict {
  id: IMongoObjectId;
  input: IDistrictInput;
}
