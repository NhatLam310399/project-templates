import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/homepage";
import { getAllHomePageSaga } from "./homepage";

export default function* homepageSaga() {
  yield all([takeLatest(types.GET_ALL_HOME_PAGE, getAllHomePageSaga)]);
}
