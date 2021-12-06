import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/billingWallet";

interface IBillingWallet {
  stepIndex: number;
}

const initialState: IBillingWallet = {
  stepIndex: 1,
};

const billingWallet = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.NEXT_STEP_BILLING_WALLET:
        draft.stepIndex += 1;
        break;
      case types.DEFAULT_STEP_BILLING_WALLET:
        draft.stepIndex = 1;
        console.log(draft.stepIndex);
        break;
    }
  });

export default billingWallet;
