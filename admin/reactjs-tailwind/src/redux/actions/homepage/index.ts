import * as types from "redux/types/homepage";

export const getAllHomePage = () => ({
  type: types.GET_ALL_HOME_PAGE,
});

export const getAllHomePageSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_HOME_PAGE_SUCCESS,
  payload,
});
