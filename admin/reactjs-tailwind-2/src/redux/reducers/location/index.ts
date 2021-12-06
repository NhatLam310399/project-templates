import produce from "immer";
import { AnyAction } from "redux";
import { IProvince, IDistrict, IWard, IStreet } from "common/formatTypes";
import * as types from "redux/types/location";

export interface ILocationState {
    provinces: IProvince[];
    provincesTotalCount: number;
    loadingProvince: boolean;

    districts: IDistrict[];
    districtsTotalCount: number;
    loadingDistrict: boolean;

    wards: IWard[];
    wardsTotalCount: number;
    loadingWard: boolean;
}

const initial: ILocationState = {
    provinces: [],
    provincesTotalCount: 0,
    loadingProvince: true,

    districts: [],
    districtsTotalCount: 0,
    loadingDistrict: true,

    wards: [],
    wardsTotalCount: 0,
    loadingWard: true,
};

const locationReducer = (state = initial, action: AnyAction) =>
    produce(state, draft => {
        switch (action.type) {
            case types.GET_PROVINCE_SUCCESS:
                draft.provinces = action.payload.provinces;
                draft.provincesTotalCount = action.payload.totalCount;
                draft.loadingProvince = false;
                break;
            case types.GET_DISTRICTS_SUCCESS:
                draft.districts = action.payload.districts;
                draft.districtsTotalCount = action.payload.totalCount;
                draft.loadingDistrict = false;
                break;
            case types.GET_WARDS_SUCCESS:
                draft.wards = action.payload.wards;
                draft.wardsTotalCount = action.payload.totalCount;
                draft.loadingWard = false;
                break;

            default:
                break;
        }
    });

export default locationReducer;
