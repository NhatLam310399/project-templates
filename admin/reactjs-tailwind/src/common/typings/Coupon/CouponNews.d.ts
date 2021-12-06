import {
  IMongoObjectId,
  ICustomSizeImages,
  IUpload,
  ICustomSizeImagesInput,
} from "common/typings";

export interface ICouponNews {
  _id?: IMongoObjectId;
  name?: string;
  description?: string;
  keywords?: string;
  slug?: string;
  image?: ICustomSizeImages;
  expireDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICouponNewsInput {
  name?: string;
  description?: string;
  image?: IUpload;
  customImageSizeUpload?: ICustomSizeImagesInput;
  expireDate?: Date | null;
}

export interface ICreateCouponNews {
  couponNewsCreateInput: ICouponNewsInput;
}

export interface IUpdateCouponNews {
  id: IMongoObjectId;
  couponNewsUpdateInput: ICouponNewsInput;
}

export interface IFilterCouponNews {
  name?: string;
  slug?: string;
}

export interface IGetAllCouponNews {
  filterCouponNews?: IFilterCouponNews;
  page?: number;
  size?: number;
}
