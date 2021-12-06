import {
  IMongoObjectId,
  IProvince,
  IUpload,
  ITypes,
  ICustomUploadInputVideo,
  ICustomUploadInput,
  ICustomSizeImagesInput,
  ICustomSizeImages,
  IPlace,
} from "common/typings";

export interface ITrade {
  _id?: IMongoObjectId;
  company?: IPlace;
  images?: ICustomSizeImages[];
  video?: string;
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
  videos?: ICustomUploadInputVideo;
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
  videos?: ICustomUploadInputVideo;
  phoneNumberInstallationSupport?: string;
  phoneNumberSeller?: string;
  customSizeForUploadImage?: ICustomSizeImagesInput;
}

export interface IGetAllTrade {
  filterTrade?: IFilterTrade;
  page?: number;
  size?: number;
}

export interface ICreateTrade {
  tradeInput: ITradeCreateInput;
}

export interface IUpdateTrade {
  id: string;
  tradeInput: ITradeUpdateInput;
}
