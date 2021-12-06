import {
    ICreateJobLevel,
    IUpdateJobLevel,
    IDeleteJobLevel,
} from "common/formatTypes";
import * as types from "redux/types/newsConfig";

export const getAllJobLevel = () => ({
    type: types.GET_ALL_JOB_LEVEL,
});

export const getAllJobLevelSuccess = <T>(payload: T) => ({
    type: types.GET_ALL_JOB_LEVEL_SUCCESS,
    payload,
});

export const updateJobLevel = (payload: IUpdateJobLevel) => ({
    type: types.UPDATE_JOB_LEVEL,
    payload,
});

export const createJobLevel = (payload: ICreateJobLevel) => ({
    type: types.CREATE_JOB_LEVEL,
    payload,
});

export const deleteJobLevel = (payload: IDeleteJobLevel) => ({
    type: types.DELETE_JOB_LEVEL,
    payload,
});
