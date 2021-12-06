import produce from "immer";
import { AnyAction } from "redux";
import { IProvince, IDistrict, IWard, IStreet } from "common/typings";
import * as types from "redux/types/location";

export interface ILocationState {
  provinces: IProvince[];
  provincesTotalCount: number;
  districts: IDistrict[];
  districtsTotalCount: number;
  wards: IWard[];
  wardsTotalCount: number;
  streets: IStreet[];
  street: IStreet | null;
  totalNumberOfStreet: number;
}

const initial: ILocationState = {
  provinces: [],
  provincesTotalCount: 0,
  districts: [],
  districtsTotalCount: 0,
  wards: [],
  wardsTotalCount: 0,
  streets: [],
  street: null,
  totalNumberOfStreet: 0,
};

const locationReducer = (state = initial, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_PROVINCE_SUCCESS:
        draft.provinces = action.payload.provinces;
        draft.provincesTotalCount = action.payload.totalCount;
        break;
      case types.GET_DISTRICTS_SUCCESS:
        draft.districts = action.payload.districts;
        draft.districtsTotalCount = action.payload.totalCount;
        break;
      case types.GET_WARDS_SUCCESS:
        draft.wards = action.payload.wards;
        draft.wardsTotalCount = action.payload.totalCount;
        break;
      case types.GET_STREETS_SUCCESS:
        draft.streets = action.payload.streets;
        draft.totalNumberOfStreet = action.payload.totalCount;
        break;
      case types.GET_STREET_SUCCESS:
        draft.street = action.payload;
        break;
      default:
        break;
    }
  });

export default locationReducer;
