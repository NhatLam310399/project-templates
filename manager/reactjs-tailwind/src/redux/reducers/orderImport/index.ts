import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/orderImport";

interface IOrderImportState {
  stepIndex: number;
}

const initialState: IOrderImportState = {
  stepIndex: 1,
};

const register = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.NEXT_STEP_ORDER_IMPORT:
        draft.stepIndex += 1;
        break;
      case types.DEFAULT_STEP_ORDER_IMPORT:
        console.log("Hello");
        draft.stepIndex = 1;
        console.log(draft.stepIndex);
        break;
    }
  });

export default register;
