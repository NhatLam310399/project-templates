import {
  IMongoObjectId,
  IPlace,
  IUpload,
  ICustomSizeImages,
  IRoom,
  ICustomSizeImagesInput,
} from "common/typings";

export type ICouponType = "percent" | "value";

export interface ICoupon {
  _id?: IMongoObjectId;
  karaoke?: IPlace;
  name?: string;
  couponCode?: string;
  startDate?: Date;
  validTill?: Date;
  remainingCoupon?: number;
  type?: ICouponType;
  discountPercent?: number;
  discountValue?: number;
  discountBooking?: number;
  status?: boolean;
  usedCoupon?: number;
  description?: string;
  isPublic?: boolean;
  keywords?: string;
  slug?: string;
  point?: number;
  image?: ICustomSizeImages;
}
export interface ICouponInput {
  karaoke?: string;
  name?: string;
  validTill?: Date;
  couponCode?: string;
  discountValue?: number;
  startDate?: Date;
  discountPercent?: number;
  status?: boolean;
  description?: string;
  isPublic?: boolean;
  remainingCoupon?: number;
  image?: IUpload;
  point?: number;
  type?: ICouponType;
  discountBooking?: number;
  customImageSizeUpload?: ICustomSizeImagesInput;
}

export interface ICreateCoupon {
  createCouponInput: ICouponInput;
}

export interface IUpdateCoupon {
  id: IMongoObjectId;
  updateCouponInput: ICouponInput;
}

export interface IGetCouponByKaraoke {
  idKara?: string;
  page?: number;
  size?: number;
}
