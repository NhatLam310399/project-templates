import { all, takeLatest } from "redux-saga/effects"
import * as types from "redux/types/premiumImage"
import { getAllPremiumImage } from "./premiumImage"

export default function* clipArtSaga() {
  yield all([takeLatest(types.GET_ALL_PREMIUM_IMAGE, getAllPremiumImage),
  ])
}