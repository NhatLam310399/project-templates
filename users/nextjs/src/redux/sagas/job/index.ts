import { all, takeLatest } from "redux-saga/effects";
import {
  getAllJobLevelSaga,
  getAllJobTypeSaga,
  getAllLevelPriceSaga,
} from "./get";
import * as types from "@redux/types/job";

export default function* jobSaga() {
  yield all([
    takeLatest(types.GET_ALL_JOB_TYPE, getAllJobTypeSaga),
    takeLatest(types.GET_ALL_JOB_LEVEL, getAllJobLevelSaga),
    takeLatest(types.GET_ALL_LEVEL_PRICE, getAllLevelPriceSaga),
  ]);
}
