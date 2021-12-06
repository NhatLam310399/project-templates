import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/project";
import {
  createProjectSaga,
  deleteProjectSaga,
  getAllProjectSaga,
  updateProjectSaga,
} from "./project";

export default function* projectSaga() {
  yield all([
    takeLatest(types.GET_ALL_PROJECT, getAllProjectSaga),
    takeLatest(types.CREATE_PROJECT, createProjectSaga),
    takeLatest(types.UPDATE_PROJECT, updateProjectSaga),
    takeLatest(types.DELETE_PROJECT, deleteProjectSaga),
  ]);
}
