import {
  IMongoObjectId,
  IUser,
  IProvince,
  IPlace,
  IUpload,
  ITypes,
  ICustomSizeImagesInput,
  ICustomSizeImages,
  ICustomUploadInput,
  ICustomUploadInputVideo,
} from "common/typings";

export interface ITrade {
  _id?: IMongoObjectId;
  company?: IPlace;
  images?: ICustomSizeImages[];
  videos?: string;
  name?: string;
  description?: string;
  price?: number;
  province?: IProvince;
  rate?: number;
  type?: ITypes;
  quantity?: number;
  isHot?: boolean;
  keywords?: string;
  phoneNumberInstallationSupport?: string;
  phoneNumberSeller?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITradeCreateInput {
  name?: string;
  company?: string;
  description?: string;
  price?: number;
  province?: string;
  type?: string;
  quantity?: number;
  isHot?: boolean;
  images?: IUpload[];
  videos?: IUpload;
  phoneNumberInstallationSupport?: string;
  phoneNumberSeller?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface ITradeUpdateInput {
  name?: string;
  company?: string;
  description?: string;
  price?: number;
  province?: string;
  type?: string;
  quantity?: number;
  isHot?: boolean;
  images?: ICustomUploadInput[];
  videos?: IUpload;
  phoneNumberInstallationSupport?: string;
  phoneNumberSeller?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IFilterTrade {
  name?: string;
  price?: number;
  rate?: number;
  type?: string;
  isHot?: boolean;
  company?: string;
}

export interface ICreateTrade {
  tradeInput: ITradeCreateInput;
}

export interface IUpdateTrade {
  id: string;
  tradeInput: ITradeUpdateInput;
}

export interface IGetAllTrade {
  filterTrade?: IFilterTrade;
  page?: number;
  size?: number;
}
