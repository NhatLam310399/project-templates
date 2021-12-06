import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/room";
import {
  createRoomSaga,
  deleteRoomByIdSaga,
  getRoomByKaraokeIdSaga,
  updateRoomSaga,
} from "./room";

export default function* rooms() {
  yield all([
    takeLatest(types.GET_ROOM_BY_KARAOKE, getRoomByKaraokeIdSaga),
    takeLatest(types.CREATE_ROOM, createRoomSaga),
    takeLatest(types.UPDATE_ROOM, updateRoomSaga),
    takeLatest(types.DELETE_ROOM_BY_ID, deleteRoomByIdSaga),
  ]);
}
