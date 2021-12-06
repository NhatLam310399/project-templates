import { IGetAllHomePageManager } from "common/typings";
import * as types from "redux/types/homepage";

export const getAllHomePageManager = (payload: IGetAllHomePageManager) => ({
  type: types.GET_ALL_HOME_PAGE_MANAGER,
  payload,
});

export const getAllHomePageManagerSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_HOME_PAGE_MANAGER_SUCCESS,
  payload,
});
