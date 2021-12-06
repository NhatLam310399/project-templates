import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/otherSetting";
import { getPointSettingSaga, updatePointSettingSaga } from "./point";

import {
    getAllNotifySettingSaga,
    createNotifySettingSaga,
    updateNotifySettingSaga,
    deleteNotifySettingSaga,
} from "./notify";

export default function* otherSettingSaga() {
    yield all([
        // Point
        takeLatest(types.GET_POINT_SETTING, getPointSettingSaga),
        takeLatest(types.UPDATE_POINT_SETTING, updatePointSettingSaga),
        // Notify
        takeLatest(types.GET_ALL_NOTIFY_SETTING, getAllNotifySettingSaga),
        takeLatest(types.CREATE_NOTIFY_SETTING, createNotifySettingSaga),
        takeLatest(types.UPDATE_NOTIFY_SETTING, updateNotifySettingSaga),
        takeLatest(types.DELETE_NOTIFY_SETTING, deleteNotifySettingSaga),
    ]);
}
