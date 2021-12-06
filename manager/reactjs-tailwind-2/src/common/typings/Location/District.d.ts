import { IMongoObjectId } from "common/typings";

export interface IDistrict {
  _id?: string;
  name?: string;
  code?: string;
  province_name?: string;
  province_code?: string;
  slug?: string;
  level?: string;
  longitude?: number;
  latitude?: number;
  slugEn?: string;
  nameEn?: string;
  label?: string;
  value?: string;
}

export interface IDistrictInput {
  name?: string;
  code?: string;
  province_name?: string;
  province_code?: string;
  slug?: string;
  level?: string;
  longitude?: number | null;
  latitude?: number | null;
  slugEn?: string;
  nameEn?: string;
}

// API Variables

export interface IGetDistricts {
  name?: string;
  page?: number;
  size?: number;
  province_code?: string | null;
}

export interface IUpdateDistrict {
  id: IMongoObjectId | null;
  input: IDistrictInput;
}
