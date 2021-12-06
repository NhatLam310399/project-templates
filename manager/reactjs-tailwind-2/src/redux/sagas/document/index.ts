import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/document";
import {
  createBasicDocumentSaga,
  deleteBasicDocumentSaga,
  getAllBasicDocumentSaga,
  updateBasicDocumentSaga,
} from "./basicDocument";
import {
  createDocumentSaga,
  deleteDocumentSaga,
  getAllDocumentSaga,
  updateDocumentSaga,
} from "./document";

export default function* documentSaga() {
  yield all([
    // DOCUMENT
    takeLatest(types.GET_ALL_DOCUMENT, getAllDocumentSaga),
    takeLatest(types.CREATE_DOCUMENT, createDocumentSaga),
    takeLatest(types.UPDATE_DOCUMENT, updateDocumentSaga),
    takeLatest(types.DELETE_DOCUMENT, deleteDocumentSaga),
    // BASIC DOCUMENT
    takeLatest(types.GET_ALL_BASIC_DOCUMENT, getAllBasicDocumentSaga),
    takeLatest(types.CREATE_BASIC_DOCUMENT, createBasicDocumentSaga),
    takeLatest(types.UPDATE_BASIC_DOCUMENT, updateBasicDocumentSaga),
    takeLatest(types.DELETE_BASIC_DOCUMENT, deleteBasicDocumentSaga),
  ]);
}
