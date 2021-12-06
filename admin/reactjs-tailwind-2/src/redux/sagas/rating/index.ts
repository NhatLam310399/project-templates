import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/rating";
import {
    getAllRatingSaga,
    createRating,
    updateRating,
    deleteRatingSaga,
} from "./rating";

export default function* jobSaga() {
    yield all([
        takeLatest(types.GET_ALL_RATING, getAllRatingSaga),
        takeLatest(types.CREATE_RATING, createRating),
        takeLatest(types.UPDATE_RATING, updateRating),
        takeLatest(types.DELETE_RATING, deleteRatingSaga),
    ]);
}
