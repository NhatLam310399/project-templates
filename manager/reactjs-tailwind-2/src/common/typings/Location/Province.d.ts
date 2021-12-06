import { IMongoObjectId } from "common/typings";

export interface IProvince {
  _id?: string;
  name?: string;
  code?: string;
  nameEn?: string;
  longitude?: number;
  latitude?: number;
  id?: string;
  value?: string;
  label?: string;
}

export interface IProvinceInput {
  name?: string;
  code?: string;
  unit?: string;
}

export interface IGetProvince {
  name?: string;
  page?: number;
  size?: number;
}

export interface IUpdateProvince {
  id: IMongoObjectId;
  input: IProvinceInput;
}
