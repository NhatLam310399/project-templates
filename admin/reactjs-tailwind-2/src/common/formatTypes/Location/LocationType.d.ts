export interface ILocationType {
    province?: string;
    district?: string;
    ward?: string;
    street?: string;
    latitude?: number;
    longitude?: number;
}

export interface ILocationTypeInput {
    name?: string;
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    streetName?: string;
    longitude?: number;
    latitude?: number;
}
