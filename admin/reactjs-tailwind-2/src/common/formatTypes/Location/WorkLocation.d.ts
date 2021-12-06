import {
    IMongoObjectId,
    ILocationTypeInput,
    IProvince,
    IDistrict,
    IWard,
    IStreet,
} from "common/formatTypes";

export interface IWorkLocation {
    _id?: IMongoObjectId;
    name?: string;
    province?: IProvince;
    district?: IDistrict;
    ward?: IWard;
    street?: IStreet;
    longitude?: number;
    latitude?: number;
}

export interface IWorkLocationInput {
    name?: string;
    locationTypeInput?: ILocationTypeInput;
}
