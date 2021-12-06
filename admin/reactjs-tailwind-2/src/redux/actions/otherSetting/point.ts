import { IUpdatePointSetting } from "common/formatTypes";
import * as types from "redux/types/otherSetting";

export const getPointSetting = () => ({
    type: types.GET_POINT_SETTING,
});

export const getPointSettingSuccess = <T>(payload: T) => ({
    type: types.GET_POINT_SETTING_SUCCESS,
    payload,
});

export const updatePointSetting = (payload: IUpdatePointSetting) => ({
    type: types.UPDATE_POINT_SETTING,
    payload,
});
