import * as types from "redux/types/register";

export const actionSetRegisterData = (payload: any) => ({
  type: types.ACTION_SET_REGISTER_DATA,
  payload,
});

export const actionRemoveRegisterData = () => ({
  type: types.ACTION_REMOVE_REGISTER_DATA,
});
