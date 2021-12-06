import * as types from "redux/types/benefit";
import {
    IGetById,
    ICreateBenefit,
    IGetAllBenefit,
    IUpdateBenefit,
} from "common/formatTypes";

export const getAllBenefit = (payload: IGetAllBenefit) => ({
    type: types.GET_ALL_BENEFIT,
    payload,
});

export const getAllBenefitSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_BENEFIT_SUCCESS,
    payload,
});

export const createBenefit = (payload: ICreateBenefit) => ({
    type: types.CREATE_BENEFIT,
    payload,
});

export const updateBenefit = (payload: IUpdateBenefit) => ({
    type: types.UPDATE_BENEFIT,
    payload,
});

export const deleteBenefit = (payload: IGetById) => ({
    type: types.DELETE_BENEFIT,
    payload,
});
