import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/store";

interface IStore {
  stepIndex: number;
  dataStep: any;
}

const initialState: IStore = {
  stepIndex: 1,
  dataStep: null,
};

const register = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.NEXT_STEP_STORE:
        draft.stepIndex = action.payload.step;
        draft.dataStep = action.payload.dataStep;
        break;
      case types.DEFAULT_STEP_STORE:
        draft.stepIndex = 1;
        draft.dataStep = null;
        console.log(draft.stepIndex);
        break;
    }
  });

export default register;
