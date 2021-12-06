import * as types from "@redux/types/location";
import { IGetDistricts } from "@common/typings";

export const getDistricts = (payload: IGetDistricts) => ({
  type: types.GET_DISTRICTS,
  payload,
});

export const getDistrictsSuccess = <T>(payload: T) => ({
  type: types.GET_DISTRICTS_SUCCESS,
  payload,
});
