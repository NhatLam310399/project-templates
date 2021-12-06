import { IBreadCrumb } from "common/typings";
import * as types from "redux/types/_config";

export const setExtendDrawer = (payload: boolean) => ({
  type: types.SET_EXTEND_DRAWER,
  payload,
});

export const setExtendDrawerDropdown = (payload: boolean) => ({
  type: types.SET_EXTEND_DRAWER_DROPDOWN,
  payload,
});

export const setBreadCrumb = (payload: IBreadCrumb[]) => ({
  type: types.SET_BREADCRUMB,
  payload,
});
