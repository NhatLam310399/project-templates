import {
  NEXT_STEP,
  ADD_NEW_EMAIL,
  ADD_NEW_PASSWORD,
} from "redux/types/settingAccount";

export const nextStep = (payload: number) => {
  return {
    type: NEXT_STEP,
    payload,
  };
};

export const addNewPassword = (payload: string) => {
  return {
    type: ADD_NEW_PASSWORD,
    payload,
  };
};

export const addNewEmail = (payload: string) => {
  return {
    type: ADD_NEW_EMAIL,
    payload,
  };
};
