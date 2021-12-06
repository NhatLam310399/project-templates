import { IDistrict, IWardInput, IProvince } from "common/typings";

export interface ILocation {
  province?: IProvince;
  district?: IDistrict;
  ward?: IWardInput;
  street?: string;
}

export interface ILocationTypeInput {
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  street_name?: string;
  longitude?: string;
  latitude?: string;
}

export interface ITypePoint {
  type?: string;
}

export interface IPointInput {
  type: string;
  coordinates: number[];
}
export interface IPointGeometry {
  type?: ITypePoint;
  coordinates: number[];
}
