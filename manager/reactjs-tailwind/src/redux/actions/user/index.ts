import { ICreateUser, ICheckExistEmail, IUpdatePasswordUser } from "typings";
import * as types from "redux/types/user";

export const createUser = (payload: ICreateUser) => ({
  type: types.CREATE_USER,
  payload,
});

export const checkExistEmail = (payload: ICheckExistEmail) => ({
  type: types.CHECK_EXIST_EMAIL,
  payload,
});
export const checkExistEmailOtherProvider = (payload: ICheckExistEmail) => ({
  type: types.CHECK_EXIST_EMAIL_OTHER_PROVIDER,
  payload,
});
export const updatePassword = (payload: IUpdatePasswordUser) => ({
  type: types.UPDATE_PASSWORD,
  payload,
});
