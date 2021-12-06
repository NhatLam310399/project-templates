import { IMongoObjectId } from "typings";

export interface ICoupon {
  _id?: IMongoObjectId;
  name?: string;
  validTill?: Date;
  couponCode?: string;
  discountValue?: number;
  status?: boolean;
  remainingCoupon?: number;
  usedCoupon?: number;
  description?: string;
  isPublic?: boolean;
  keywords?: string;
  slug?: string;
}

export interface ICouponInput {
  name?: string;
  validTill?: Date;
  couponCode?: string;
  discountValue?: number;
  status?: boolean;
  description?: string;
  isPublic?: boolean;
  remainingCoupon?: number;
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
