import { all, takeLatest } from "redux-saga/effects";

import * as types from "@redux/types/evaluate";
import { getEvaluateByUserIdSaga } from "./get";

export default function* evaluateSaga() {
  yield all([
    takeLatest(types.GET_EVALUATE_BY_USER_ID, getEvaluateByUserIdSaga),
  ]);
}
