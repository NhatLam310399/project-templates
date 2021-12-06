import * as types from "redux/types/types";
import { IGetAllTypeUser } from "common/typings";

export const getAllTypeUser = (payload: IGetAllTypeUser) => ({
  type: types.GET_ALL_TYPE_USER,
  payload,
});

export const getAllTypeUserSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_TYPE_USER_SUCCESS,
  payload,
});
