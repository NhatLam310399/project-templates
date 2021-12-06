import * as types from "redux/types/fileLibrary";
export const step = (payload: number) => ({
  type: types.STEP_FILE,
  payload,
});
