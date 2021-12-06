import produce from "immer";
import { AnyAction } from "redux";
import { IProvince, IDistrict, IWard, IStreet } from "@common/typings";
import * as types from "@redux/types/location";

export interface ILocationState {
  provinces: IProvince[];
  districts: IDistrict[];
  wards: IWard[];
  streets: IStreet[];
  provinceSelected: IProvince;
}
const initial: ILocationState = {
  provinces: [],
  districts: [],
  wards: [],
  streets: [],
  provinceSelected: null,
};
const location = (state = initial, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_PROVINCE_SUCCESS:
        draft.provinces = action.payload;
        break;
      case types.GET_DISTRICTS_SUCCESS:
        draft.districts = action.payload.districts;
        break;
      case types.GET_WARDS_SUCCESS:
        draft.wards = action.payload.wards;
        break;
      case types.GET_STREETS_BY_PROVINCE_AND_DISTRICT_SUCCESS:
        draft.streets = action.payload.streets;
        break;
      case types.SET_PROVINCE_SELECTED:
        draft.provinceSelected = action.payload;
        break;
      default:
        break;
    }
  });

export default location;
