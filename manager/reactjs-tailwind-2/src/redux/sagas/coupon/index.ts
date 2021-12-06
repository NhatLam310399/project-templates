import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/coupon";
import {
  createCouponSaga,
  deleteCouponSaga,
  getCouponByKaraokeSaga,
  updateCouponSaga,
} from "./code";

export default function* couponSaga() {
  yield all([
    takeLatest(types.GET_COUPON_BY_KARAOKE, getCouponByKaraokeSaga),
    takeLatest(types.CREATE_COUPON, createCouponSaga),
    takeLatest(types.UPDATE_COUPON, updateCouponSaga),
    takeLatest(types.DELETE_COUPON, deleteCouponSaga),
  ]);
}
