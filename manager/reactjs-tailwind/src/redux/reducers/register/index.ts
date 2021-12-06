import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/register";
import { IUserInput } from "typings";

interface IRegisterState {
  stepIndex: number;
  registerData: IUserInput;
}

const initialState: IRegisterState = {
  stepIndex: 1,
  registerData: {},
};

const register = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.NEXT_STEP:
        draft.stepIndex = action.payload;
        console.log("action.payload", action.payload);
        break;
      case types.ADD_DATA:
        draft.registerData = action.payload;
        break;
    }
  });

export default register;
