import * as types from "redux/types/billingMethod";

export const nextStepBillingMethod = () => ({
  type: types.NEXT_STEP_BILLING_METHOD,
});

export const defaultStepBillingMethod = () => ({
  type: types.DEFAULT_STEP_BILLING_METHOD,
});
