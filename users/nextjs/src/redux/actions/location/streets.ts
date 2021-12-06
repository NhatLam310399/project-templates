import * as types from "@redux/types/location";
import { IGetStreet } from "@common/typings";

export const getStreetByProvinceAndDistrict = (payload: IGetStreet) => ({
  type: types.GET_STREETS_BY_PROVINCE_AND_DISTRICT,
  payload,
});

export const getStreetByProvinceAndDistrictSuccess = <T>(payload: T) => ({
  type: types.GET_STREETS_BY_PROVINCE_AND_DISTRICT_SUCCESS,
  payload,
});
