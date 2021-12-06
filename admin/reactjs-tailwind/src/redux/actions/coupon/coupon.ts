import * as types from "redux/types/coupon";
import {
  IById,
  ICreateCoupon,
  IGetCoupons,
  IUpdateCoupon,
} from "common/typings";

export const getPublicCoupons = (payload: IGetCoupons) => ({
  type: types.GET_PUBLIC_COUPONS,
  payload,
});

export const getPublicCouponsSuccess = <T>(payload: T) => ({
  type: types.GET_PUBLIC_COUPONS_SUCCESS,
  payload,
});

export const createCoupon = (payload: ICreateCoupon) => ({
  type: types.CREATE_COUPON,
  payload,
});

export const updateCoupon = (payload: IUpdateCoupon) => ({
  type: types.UPDATE_COUPON,
  payload,
});

export const deleteCoupon = (payload: IById) => ({
  type: types.DELETE_COUPON,
  payload,
});
