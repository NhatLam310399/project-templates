import * as types from "redux/types/types";
import { IGetTypesByCode } from "common/formatTypes";

export const getTypesByCode = (payload: IGetTypesByCode) => ({
    type: types.GET_TYPES_BY_CODE,
    payload,
});
export const getTypesByCodeSuccess = (payload: IGetTypesByCode) => ({
    type: types.GET_TYPES_BY_CODE_SUCCESS,
    payload,
});
