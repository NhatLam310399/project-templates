import { IBreadcrumb } from "common/formatTypes";
import * as types from "redux/types/_config";

export const setLanguage = (payload: string) => ({
    type: types.SET_LANGUAGE,
    payload,
});

export const setExtendDrawer = (payload: boolean) => ({
    type: types.SET_EXTEND_DRAWER,
    payload,
});

export const setBreadcrumb = (payload: IBreadcrumb) => ({
    type: types.SET_BREADCRUMB,
    payload,
});

export const setCollapseDrawer = (payload: boolean) => ({
    type: types.SET_COLLAPSE_DRAWER,
    payload,
});

export const setHoverDrawer = (payload: boolean) => ({
    type: types.SET_HOVER_DRAWER,
    payload,
});
