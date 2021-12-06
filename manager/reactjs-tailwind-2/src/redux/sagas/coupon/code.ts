import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllCouponSuccess } from "redux/actions/coupon";
import * as services from "services/coupon";

export function* getCouponByKaraokeSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getCouponByKaraoke,
    variables,
  );
  yield put(setLoading(false));

  const { getCouponByKaraoke: result } = response?.data || {};

  if (result) {
    yield put(getAllCouponSuccess(result));
  }
}

export function* createCouponSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createCoupon,
    variables,
  );
  yield put(setLoading(false));

  const { createCoupon: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Thêm mới thành công",
        message: "",
      }),
    );
  }
}

export function* updateCouponSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateCoupon,
    variables,
  );
  yield put(setLoading(false));

  const { updateCoupon: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Cập nhật thành công",
        message: "",
      }),
    );
  }
}

export function* deleteCouponSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteCoupon,
    variables,
  );
  yield put(setLoading(false));

  const { deleteCoupon: result } = response?.data || {};
  if (result) {
    yield put(actionSuccess());
    yield put(
      showNotification({
        type: "success",
        title: "Xóa thành công",
        message: "",
      }),
    );
  }
}
