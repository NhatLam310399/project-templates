import { IMongoObjectId } from "typings";

export interface IDistrict {
  _id?: IMongoObjectId;
  name: string;
  code?: string;
  unit?: string;
  full_name?: string;
  province_name?: string;
  province_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface IGetDistricts {
  name?: string;
  page?: number;
  size?: number;
  province_code?: string;
}

export interface IDistrictInput {
  name?: string;
  code?: string;
  unit?: string;
  full_name?: string;
  province_name?: string;
  province_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface IUpdateDistrict {
  id: IMongoObjectId;
  input: IDistrictInput;
}
