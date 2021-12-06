import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/billingMethod";

interface IBillingMethod {
  stepIndex: number;
}

const initialState: IBillingMethod = {
  stepIndex: 1,
};

const register = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.NEXT_STEP_BILLING_METHOD:
        draft.stepIndex += 1;
        break;
      case types.DEFAULT_STEP_BILLING_METHOD:
        draft.stepIndex = 1;
        console.log(draft.stepIndex);
        break;
    }
  });

export default register;
