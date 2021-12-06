import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/message";
import {
  getAllMessageSaga,
  createMessageSaga,
  updateMessageSaga,
  deleteMessageByIdSaga,
} from "./message";

export default function* messageSaga() {
  yield all([
    takeLatest(types.GET_ALL_MESSAGE, getAllMessageSaga),
    takeLatest(types.CREATE_MESSAGE, createMessageSaga),
    takeLatest(types.UPDATE_MESSAGE, updateMessageSaga),
    takeLatest(types.DELETE_MESSAGE_BY_ID, deleteMessageByIdSaga),
  ]);
}
