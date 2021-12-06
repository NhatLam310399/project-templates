import * as types from "@redux/types/_app";
import { IPermission } from "@common/typings";

export const setPermission = (payload: IPermission) => ({
  type: types.SET_PERMISSION,
  payload,
});
export const setUser = (payload: any) => ({
  type: types.SET_APP_USER,
  payload,
});
