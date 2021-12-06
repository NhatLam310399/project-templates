import { IGraphQLResponse } from "@common/typings";
import { call, put } from "@redux-saga/core/effects";
import * as services from "@services/requestReview";
import {
  createRequestReview,
  getAllRequestReviewSuccess,
  getEvaluateByUserSuccess,
} from "@redux/actions/requestReview";
import { actionSuccess } from "@redux/actions/common";
import { showNotification } from "@components/ToastNotification";

export function* getAllReviewRequest(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getAllRequestReview,
    variables,
  );
  const { getAllRequestReview: results } = response?.data || {};
  if (results) {
    yield put(getAllRequestReviewSuccess(results));
  }
}

export function* getEvaluateByUserSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.getEvaluateByUser,
    variables,
  );
  const { getEvaluateByUser: results } = response?.data || {};
  if (results) {
    yield put(getEvaluateByUserSuccess(results));
  }
}

export function* createRequestReviewSaga(payload: any) {
  const variables = payload.payload;
  const response: IGraphQLResponse = yield call(
    services.createRequestReview,
    variables,
  );
  const { createRequestReview: results } = response?.data || {};
  if (results) {
    yield put(actionSuccess());

    showNotification({
      type: "success",
      title: "Thông báo",
      message: "Yêu cầu đánh giá thành công",
    });
  }
}
