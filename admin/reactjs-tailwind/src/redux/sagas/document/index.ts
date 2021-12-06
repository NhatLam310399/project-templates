import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/document";
import {
  createBasicDocumentSaga,
  deleteBasicDocumentSaga,
  getAllBasicDocumentSaga,
  updateBasicDocumentSaga,
} from "./document";

export default function* basicDocumentSaga() {
  yield all([
    takeLatest(types.GET_ALL_BASIC_DOCUMENT, getAllBasicDocumentSaga),
    takeLatest(types.CREATE_BASIC_DOCUMENT, createBasicDocumentSaga),
    takeLatest(types.UPDATE_BASIC_DOCUMENT, updateBasicDocumentSaga),
    takeLatest(types.DELETE_BASIC_DOCUMENT, deleteBasicDocumentSaga),
  ]);
}
