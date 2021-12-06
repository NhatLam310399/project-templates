import { all, takeLatest } from "@redux-saga/core/effects";
import * as types from "@redux/types/requestReview";
import {
  getAllReviewRequest,
  getEvaluateByUserSaga,
  createRequestReviewSaga,
} from "./get";

export default function* requestReview() {
  yield all([
    takeLatest(types.GET_ALL_REQUEST_REVIEW, getAllReviewRequest),
    takeLatest(types.GET_EVALUATE_BY_USER, getEvaluateByUserSaga),
    takeLatest(types.CREATE_REQUEST_REVIEW, createRequestReviewSaga),
  ]);
}
