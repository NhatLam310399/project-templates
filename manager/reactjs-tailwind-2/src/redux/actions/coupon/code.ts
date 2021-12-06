import * as types from "redux/types/coupon";
import {
  IById,
  ICreateCoupon,
  IGetCouponByKaraoke,
  IUpdateCoupon,
} from "common/typings";

export const getCouponByKaraoke = (payload: IGetCouponByKaraoke) => ({
  type: types.GET_COUPON_BY_KARAOKE,
  payload,
});

export const getAllCouponSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_COUPON_SUCCESS,
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
