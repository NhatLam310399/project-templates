import { call, put } from "redux-saga/effects";
import { IGraphQLResponse } from "common/typings";
import { showNotification } from "redux/actions/notification";
import { actionSuccess, setLoading } from "redux/actions/common";
import { getAllCouponNewsSuccess } from "redux/actions/coupon";
import * as services from "services/coupon";

export function* getAllCouponNewsSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.getAllCouponNews,
    variables,
  );
  yield put(setLoading(false));

  const { getAllCouponNews: result } = response?.data || {};
  if (result) {
    yield put(getAllCouponNewsSuccess(result));
  }
}

export function* createCouponNewsSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.createCouponNews,
    variables,
  );
  yield put(setLoading(false));

  const { createCouponNews: result } = response?.data || {};
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

export function* updateCouponNewsSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.updateCouponNews,
    variables,
  );
  yield put(setLoading(false));

  const { updateCouponNews: result } = response?.data || {};
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

export function* deleteCouponNewsByIdSaga(payload: any) {
  const variables = payload.payload;

  yield put(setLoading(true));
  const response: IGraphQLResponse = yield call(
    services.deleteCouponNewsById,
    variables,
  );
  yield put(setLoading(false));

  const { deleteCouponNewsById: result } = response?.data || {};
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
