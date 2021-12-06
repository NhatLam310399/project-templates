import { all, takeLatest } from "redux-saga/effects";
import * as types from "redux/types/job";
import {
    createJobSaga,
    deleteJobSaga,
    getAllJobSaga,
    updateJobSaga,
} from "./job";
import {
    getRecruitmentAppliedUserSaga,
    getRecruitmentViewedUserSaga,
} from "./recruitmentUser";

export default function* jobSaga() {
    yield all([
        takeLatest(types.GET_ALL_JOB, getAllJobSaga),
        takeLatest(types.CREATE_JOB, createJobSaga),
        takeLatest(types.UPDATE_JOB, updateJobSaga),
        takeLatest(types.DELETE_JOB, deleteJobSaga),

        takeLatest(
            types.GET_RECRUITMENT_APPLIED_USER,
            getRecruitmentAppliedUserSaga,
        ),
        takeLatest(
            types.GET_RECRUITMENT_VIEWED_USER,
            getRecruitmentViewedUserSaga,
        ),
    ]);
}
