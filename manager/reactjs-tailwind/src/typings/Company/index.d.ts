import {
  ICustomSizeImages,
  IUser,
  IProvince,
  IDistrict,
  IWard,
  ITypes,
  IStreet,
} from "typings";

// This is just fake Schema
export interface ICompany {
  _id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  logo?: ICustomSizeImages;
  user?: IUser;
  isHot?: boolean;
  province?: IProvince;
  district?: IDistrict;
  ward?: IWard;
  street?: IStreet;
  type?: ITypes;
  enable?: boolean;
  description?: string;
  licenseImages?: ICustomSizeImages[];
}
