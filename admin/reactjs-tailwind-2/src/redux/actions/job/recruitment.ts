import * as types from "redux/types/job";
import {
    IGetAllRecruitment,
    ICrateRecruitmentInput,
    IUpdateRecruitment,
    IDeleteRecruitment,
} from "common/formatTypes";

export const getAllJob = (payload: IGetAllRecruitment) => ({
    type: types.GET_ALL_JOB,
    payload,
});

export const getAllJobSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_JOB_SUCCESS,
    payload,
});
export const createJob = (payload: ICrateRecruitmentInput) => ({
    type: types.CREATE_JOB,
    payload,
});

export const updateJob = (payload: IUpdateRecruitment) => ({
    type: types.UPDATE_JOB,
    payload,
});

export const deleteJob = (payload: IDeleteRecruitment) => ({
    type: types.DELETE_JOB,
    payload,
});
