import { all, takeLatest } from "redux-saga/effects"
import * as types from "redux/types/clipArt"
import { getAllCategory } from "./category"
import { getAllClipArt } from "./clipArt"

export default function* clipArtSaga() {
  yield all([takeLatest(types.GET_ALL_CATEGORY, getAllCategory),
  takeLatest(types.GET_ALL_CLIP_ART, getAllClipArt)])
}