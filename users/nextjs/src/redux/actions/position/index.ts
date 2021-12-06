import * as types from "@redux/types/position";

export const getAllPosition = () => ({
  type: types.GET_POSITION,
});

export const getAllPositionSuccess = <T>(payload: T) => ({
  type: types.GET_POSITION_SUCCESS,
  payload,
});
