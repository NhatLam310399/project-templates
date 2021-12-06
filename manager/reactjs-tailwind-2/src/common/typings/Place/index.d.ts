import {
  IMongoObjectId,
  IRoom,
  IProvince,
  IDistrict,
  IWard,
  IUser,
  ILocationTypeInput,
  ICustomSizeImagesInput,
  IUpload,
  ICustomSizeImages,
  IPointGeometry,
  ICustomUploadInput,
  ICustomUploadInputVideo,
  IPointInput,
} from "common/typings";

export type IPlaceType =
  | "PENDING_COMPANY"
  | "PENDING_KARAOKE"
  | "KARAOKE"
  | "COMPANY";

export interface IPlace {
  _id?: IMongoObjectId;
  name?: string;
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
  type?: IPlaceType;
  user?: IUser;
  amountRoom?: number;
  price?: number;
  rate?: number;
  highlight?: boolean;
  description?: string;
  enabled?: boolean;
  slug?: string;
  keywords?: string;
  location?: IPointGeometry;
  favorites?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFilterPlace {
  name?: string;
  priceMin?: number;
  slug?: string;
  status?: boolean;
}

export interface IGetKaraokeByBoss {
  idUser?: string;
}

export interface IPlaceCreateInput {
  name?: string;
  phoneNumber?: string;
  email?: string;
  locationTypeInput: ILocationTypeInput;
  street?: string;
  introduce?: string;
  images?: IUpload[];
  logo?: IUpload;
  videos?: IUpload[];
  licenseImages?: IUpload[];
  status?: boolean;
  type?: string;
  user?: string;
  amountRoom?: number;
  price?: number;
  rate?: number;
  highlight?: boolean;
  description?: string;
  enabled?: boolean;
  slug?: string;
  location: IPointInput;
  keywords?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IPlaceUpdateInput {
  name?: string;
  phoneNumber?: string;
  email?: string;
  locationTypeInput?: ILocationTypeInput;
  introduce?: string;
  description?: string;
  images?: ICustomUploadInput[];
  logo?: IUpload;
  videos?: ICustomUploadInputVideo[];
  licenseImages?: ICustomUploadInput[];
  status?: boolean;
  permission?: string;
  room?: string[];
  user?: string;
  amountRoom?: number;
  rate?: number;
  highlight?: boolean;
  enabled?: boolean;
  price?: number;
  slug?: string;
  location?: IPointInput;
  keywords?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IUpdatePlace {
  id: string;
  placeUpdateInput: IPlaceUpdateInput;
}
