import {
  IMongoObjectId,
  IProvince,
  IDistrict,
  IWard,
  IStreet,
  IRoom,
  IUser,
  ILocationTypeInput,
  IUpload,
  ICustomSizeImagesInput,
  ICustomSizeImages,
  IPointGeometry,
  ICustomUploadInput,
  IPointInput,
} from "common/typings";
import { IBusinessType } from "constants/types";

export interface IPlace {
  _id?: IMongoObjectId;
  name: string;
  phoneNumber?: string;
  email?: string;
  province?: IProvince;
  district?: IDistrict;
  ward?: IWard;
  street?: string;
  introduce?: string;
  images?: ICustomSizeImages[];
  logo?: ICustomSizeImages;
  videos?: string[];
  licenseImages?: ICustomSizeImages[];
  status?: boolean;
  type?: IBusinessType;
  user?: IUser;
  amountRoom?: number;
  price?: number;
  rate?: number;
  highlight?: boolean;
  description?: string;
  enabled?: boolean;
  location?: IPointGeometry;
  slug?: string;
  keywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPlaceCreateInput {
  name?: string;
  phoneNumber?: string;
  email?: string;
  locationTypeInput?: ILocationTypeInput;
  introduce?: string;
  logo?: IUpload;
  images?: IUpload[];
  licenseImages?: IUpload[];
  status?: boolean;
  permission?: string;
  room?: string[];
  user?: string;
  amountRoom?: number;
  price?: number;
  rate?: number;
  highlight?: boolean;
  enabled?: boolean;
  slug?: string;
  keywords?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
  location?: IPointInput;
}

export interface IPlaceUpdateInput {
  name?: string;
  phoneNumber?: string;
  email?: string;
  locationTypeInput?: ILocationTypeInput;
  introduce?: string;
  logo?: IUpload;
  images?: ICustomUploadInput[];
  licenseImages?: ICustomUploadInput[];
  status?: boolean;
  permission?: string;
  room?: string[];
  user?: string;
  amountRoom?: number;
  price?: number;
  rate?: number;
  highlight?: boolean;
  enabled?: boolean;
  slug?: string;
  keywords?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
  location?: IPointInput;
}

export interface IFilterPlace {
  name?: string;
  priceMin?: number;
  slug?: string;
  status?: boolean;
  highlight?: boolean;
}

export interface ISetPlaceHighlight {
  id: string;
  isHighlight?: boolean;
}
