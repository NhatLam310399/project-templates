import {
  IMongoObjectId,
  IUpload,
  ICustomSizeImages,
  IRoom,
  ICustomSizeImagesInput,
} from "common/typings";

export type ICouponType = "percent" | "value";

export interface ICoupon {
  _id?: IMongoObjectId;
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
  type?: "percent" | "value";
  slug?: string;
  point?: number;
  image?: ICustomSizeImages;
}
export interface ICouponInput {
  name?: string;
  validTill?: Date;
  couponCode?: string;
  discountValue?: number;
  startDate?: Date;
  discountPercent?: number;
  status?: boolean;
  type?: "percent" | "value";
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

export interface IGetCoupons {
  name?: string;
  page?: number;
  size?: number;
}
