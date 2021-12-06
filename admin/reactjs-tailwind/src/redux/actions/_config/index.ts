import { IBreadcrumb } from "common/typings";
import * as types from "redux/types/_config";

export const setExtendDrawer = (payload: boolean) => ({
  type: types.SET_EXTEND_DRAWER,
  payload,
});

export const setBreadcrumb = (payload: IBreadcrumb) => ({
  type: types.SET_BREADCRUMB,
  payload,
});
