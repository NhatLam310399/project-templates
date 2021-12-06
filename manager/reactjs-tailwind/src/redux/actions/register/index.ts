import { IUserInput } from "typings";
import * as types from "redux/types/register";

export const nextStep = (payload: number) => ({
  type: types.NEXT_STEP,
  payload,
});

export const addData = (payload: IUserInput) => ({
  type: types.ADD_DATA,
  payload,
});
