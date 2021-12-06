import {
    IGetById,
    ICreateCareerCounseling,
    IGetCareerCounseling,
    IUpdateCareerCounseling,
} from "common/formatTypes";
import * as types from "redux/types/blog";

export const getAllCareerCounseling = (payload: IGetCareerCounseling) => ({
    type: types.GET_ALL_CAREER_COUNSELING,
    payload,
});

export const getAllCareerCounselingSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_CAREER_COUNSELING_SUCCESS,
    payload,
});

export const createCareerCounseling = (payload: ICreateCareerCounseling) => ({
    type: types.CREATE_CAREER_COUNSELING,
    payload,
});

export const updateCareerCounseling = (payload: IUpdateCareerCounseling) => ({
    type: types.UPDATE_CAREER_COUNSELING,
    payload,
});

export const deleteCareerCounseling = (payload: IGetById) => ({
    type: types.DELETE_CAREER_COUNSELING,
    payload,
});
