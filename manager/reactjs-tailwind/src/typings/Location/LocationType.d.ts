export interface ILocationType {
  province?: string;
  district?: string;
  ward?: string;
  street?: string;
  latitude?: number;
  longitude?: number;
}

export interface ILocationTypeInput {
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  streetName?: string;
  longitude?: number;
  latitude?: number;
}
