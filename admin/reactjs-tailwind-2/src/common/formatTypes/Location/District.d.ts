import { IMongoObjectId } from "common/formatTypes";

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
    page?: number;
    size?: number;
    provinceCode?: string;
    districtName?: string;
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
    districtInput: IDistrictInput;
}

export interface ICreateDistrict {
    districtInput: IDistrictInput;
}
export interface IDeleteDistrict {
    id: IMongoObjectId;
}
