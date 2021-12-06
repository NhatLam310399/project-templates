import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/resetPassword";

export interface IResetPasswordState {
  emailReset: string;
  step: number;
}

const initialState: IResetPasswordState = {
  emailReset: "",
  step: 1,
};

const resetPassword = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.NEXT_STEP:
        draft.emailReset = action.payload.emailReset;
        draft.step = action.payload.step;
        break;
    }
  });

export default resetPassword;
