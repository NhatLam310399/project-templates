import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/place";
import {
  getKaraokeByBossSaga,
  updateKaraokeSaga,
  updateCompanySaga,
} from "./place";

export default function* placeSaga() {
  yield all([
    takeLatest(types.GET_KARAOKE_BY_BOSS, getKaraokeByBossSaga),
    takeLatest(types.UPDATE_KARAOKE, updateKaraokeSaga),
    takeLatest(types.UPDATE_COMPANY, updateCompanySaga),
  ]);
}
