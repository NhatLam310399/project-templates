import * as types from "redux/types/coupon";
import {
  IById,
  ICreateCouponNews,
  IGetAllCouponNews,
  IUpdateCouponNews,
} from "common/typings";

export const getAllCouponNews = (payload: IGetAllCouponNews) => ({
  type: types.GET_ALL_COUPON_NEWS,
  payload,
});

export const getAllCouponNewsSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_COUPON_NEWS_SUCCESS,
  payload,
});

export const createCouponNews = (payload: ICreateCouponNews) => ({
  type: types.CREATE_COUPON_NEWS,
  payload,
});

export const updateCouponNews = (payload: IUpdateCouponNews) => ({
  type: types.UPDATE_COUPON_NEWS,
  payload,
});

export const deleteCouponNewsById = (payload: IById) => ({
  type: types.DELETE_COUPON_NEWS_BY_ID,
  payload,
});
