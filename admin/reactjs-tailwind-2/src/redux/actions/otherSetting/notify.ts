import {
    IGetById,
    ICreateNotifySetting,
    IUpdateNotifySetting,
    IGetAllNotifySetting,
} from "common/formatTypes";
import * as types from "redux/types/otherSetting";

export const getAllNotifySetting = (payload: IGetAllNotifySetting) => ({
    type: types.GET_ALL_NOTIFY_SETTING,
    payload,
});

export const getAllNotifySettingSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_NOTIFY_SETTING_SUCCESS,
    payload,
});

export const createNotifySetting = (payload: ICreateNotifySetting) => ({
    type: types.CREATE_NOTIFY_SETTING,
    payload,
});

export const updateNotifySetting = (payload: IUpdateNotifySetting) => ({
    type: types.UPDATE_NOTIFY_SETTING,
    payload,
});

export const deleteNotifySetting = (payload: IGetById) => ({
    type: types.DELETE_NOTIFY_SETTING,
    payload,
});
