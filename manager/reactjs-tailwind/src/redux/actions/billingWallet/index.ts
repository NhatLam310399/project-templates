import * as types from "redux/types/billingWallet";

export const nextStepBillingWallet = () => ({
  type: types.NEXT_STEP_BILLING_WALLET,
});

export const defaultStepBillingWallet = () => ({
  type: types.DEFAULT_STEP_BILLING_WALLET,
});
