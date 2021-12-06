import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/settingAccount";
interface ISettingAccount {
  stepIndex: number;
  newPassword: string;
  newEmail: string;
}

const initialState: ISettingAccount = {
  stepIndex: 1,
  newPassword: "",
  newEmail: "",
};

const register = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.NEXT_STEP:
        draft.stepIndex = action.payload;
        console.log("action.payload", action.payload);
        break;
      case types.ADD_NEW_EMAIL:
        draft.newEmail = action.payload;
        break;
      case types.ADD_NEW_PASSWORD:
        draft.newPassword = action.payload;
        break;
      default:
        draft;
        break;
    }
  });

export default register;
