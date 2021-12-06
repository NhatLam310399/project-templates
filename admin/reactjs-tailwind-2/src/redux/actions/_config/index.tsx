import * as types from "redux/types/_config";

export const setLanguage = (payload: string) => ({
    type: types.SET_LANGUAGE,
    payload,
});

export const setExtendDrawer = (payload: boolean) => ({
    type: types.SET_EXTEND_DRAWER,
    payload,
});
