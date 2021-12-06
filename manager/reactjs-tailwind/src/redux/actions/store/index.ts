import * as types from "redux/types/store";

export const nextStepStore = (step: number, dataStep: any) => ({
  type: types.NEXT_STEP_STORE,
  payload: {
    step,
    dataStep,
  },
});

export const defaultStepStore = () => ({
  type: types.DEFAULT_STEP_STORE,
});
