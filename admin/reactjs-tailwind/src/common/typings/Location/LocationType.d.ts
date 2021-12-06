export interface ILocationType {
  province?: IProvince;
  district?: IDistrict;
  ward?: IWardInput;
  street?: string;
}

export interface ILocationTypeInput {
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  street_code?: string;
  street_name?: string;
  longitude?: number;
  latitude?: number;
}
