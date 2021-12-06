import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/coupon";
import {
  createCouponSaga,
  deleteCouponSaga,
  getPublicCouponsSaga,
  updateCouponSaga,
} from "./coupon";
import {
  createCouponNewsSaga,
  deleteCouponNewsByIdSaga,
  getAllCouponNewsSaga,
  updateCouponNewsSaga,
} from "./couponNews";

export default function* couponSaga() {
  yield all([
    takeLatest(types.GET_PUBLIC_COUPONS, getPublicCouponsSaga),
    takeLatest(types.CREATE_COUPON, createCouponSaga),
    takeLatest(types.UPDATE_COUPON, updateCouponSaga),
    takeLatest(types.DELETE_COUPON, deleteCouponSaga),

    takeLatest(types.GET_ALL_COUPON_NEWS, getAllCouponNewsSaga),
    takeLatest(types.CREATE_COUPON_NEWS, createCouponNewsSaga),
    takeLatest(types.UPDATE_COUPON_NEWS, updateCouponNewsSaga),
    takeLatest(types.DELETE_COUPON_NEWS_BY_ID, deleteCouponNewsByIdSaga),
  ]);
}
