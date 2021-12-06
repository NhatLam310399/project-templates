import { IMongoObjectId } from "common/typings";

export interface IDistrict {
  _id?: IMongoObjectId;
  name: string;
  code?: string;
  unit?: string;
  full_name?: string;
  province_name?: string;
  province_code?: string;
  longitude?: number;
  latitude?: number;
}

export interface IGetDistricts {
  name?: string;
  district_name?: string;
  page?: number;
  size?: number;
  province_code?: string;
}

export interface IDistrictInput {
  name?: string;
  code?: string;
  unit?: string;
  longitude?: number;
  latitude?: number;
  full_name?: string;
  province_name?: string;
  province_code?: string;
}

export interface IUpdateDistrict {
  id: IMongoObjectId;
  districtInput: IDistrictInput;
}
export interface ICreateDistrict {
  districtInput: IDistrictInput;
}
export interface IDeleteDistrict {
  id: IMongoObjectId;
}
