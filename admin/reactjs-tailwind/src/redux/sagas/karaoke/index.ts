import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/karaoke";
import {
  createKaraokeSaga,
  updateKaraokeSaga,
  deleteAllKaraokeSaga,
  deleteKaraokeByIdSaga,
  getAllKaraokeHighlightSaga,
  getAllKaraokeSaga,
  getKaraokeByIdSaga,
  changeCompanyToKaraokeSaga,
  changeKaraokeToCompanySaga,
} from "./karaoke";

export default function* karaokeSaga() {
  yield all([
    takeLatest(types.GET_ALL_KARAOKE, getAllKaraokeSaga),
    takeLatest(types.GET_ALL_KARAOKE_HIGHLIGHT, getAllKaraokeHighlightSaga),
    takeLatest(types.GET_KARAOKE_BY_ID, getKaraokeByIdSaga),
    takeLatest(types.CREATE_KARAOKE, createKaraokeSaga),
    takeLatest(types.UPDATE_KARAOKE, updateKaraokeSaga),
    takeLatest(types.DELETE_KARAOKE_BY_ID, deleteKaraokeByIdSaga),
    takeLatest(types.DELETE_ALL_KARAOKE, deleteAllKaraokeSaga),
    takeLatest(types.CHANGE_COMPANY_TO_KARAOKE, changeCompanyToKaraokeSaga),
    takeLatest(types.CHANGE_KARAOKE_TO_COMPANY, changeKaraokeToCompanySaga),
  ]);
}
