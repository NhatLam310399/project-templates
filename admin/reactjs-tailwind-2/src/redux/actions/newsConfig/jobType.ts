import {
    ICreateJobType,
    IDeleteJobType,
    IGetAllJobType,
    IUpdateJobType,
} from "common/formatTypes";
import * as types from "redux/types/newsConfig";

export const getAllJobType = (payload: IGetAllJobType) => ({
    type: types.GET_ALL_JOB_TYPE,
    payload,
});

export const getAllJobTypeSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_JOB_TYPE_SUCCESS,
    payload,
});

export const updateJobType = (payload: IUpdateJobType) => ({
    type: types.UPDATE_JOB_TYPE,
    payload,
});

export const createJobType = (payload: ICreateJobType) => ({
    type: types.CREATE_JOB_TYPE,
    payload,
});

export const deleteJobType = (payload: IDeleteJobType) => ({
    type: types.DELETE_JOB_TYPE,
    payload,
});
