import { IOption } from "@designs/Select";
import * as types from "@redux/types/recruitment";

export const setSortTypeSelected = (payload: IOption) => ({
  type: types.SET_SORT_TYPE_SELECTED,
  payload,
});
