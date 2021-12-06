import * as types from "redux/types/job";
import {
    IGetRecruitmentAppliedUser,
    IGetRecruitmentViewedUser,
} from "common/formatTypes";

export const getRecruitmentAppliedUser = (
    payload: IGetRecruitmentAppliedUser,
) => ({
    type: types.GET_RECRUITMENT_APPLIED_USER,
    payload,
});

export const getRecruitmentViewedUser = (
    payload: IGetRecruitmentViewedUser,
) => ({
    type: types.GET_RECRUITMENT_VIEWED_USER,
    payload,
});

export const getRecruitmentUserSuccess = <T>(payload: T) => ({
    type: types.GET_RECRUITMENT_USER_SUCCESS,
    payload,
});
