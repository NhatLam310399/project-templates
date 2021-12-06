import * as types from "redux/types/resetPassword";
import { IResetPassword } from "typings/Auth";
import { IResetPasswordState } from "redux/reducers/resetPassword";
export const resetPassword = (payload: IResetPassword) => ({
  type: types.RESET_PASSWORD,
  payload,
});

export const nextStep = (payload: IResetPasswordState) => ({
  type: types.NEXT_STEP,
  payload,
});
