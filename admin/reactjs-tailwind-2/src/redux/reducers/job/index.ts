import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/job";
import { IRecruitment, IUser } from "common/formatTypes";

interface IJobState {
    allJob: {
        results: IRecruitment[];
        totalCount: number;
        loading: boolean;
    };
    allRecruitmentUser: {
        results: IUser[];
        totalCount: number;
        loading: boolean;
    };
}

const initialState: IJobState = {
    allJob: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    allRecruitmentUser: {
        results: [],
        totalCount: 0,
        loading: true,
    },
};

const jobReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_ALL_JOB_SUCCESS:
                draft.allJob = { ...actions.payload, loading: false };
                break;
            case types.GET_RECRUITMENT_USER_SUCCESS:
                draft.allRecruitmentUser = {
                    ...actions.payload,
                    loading: false,
                };
                break;
            default:
                break;
        }
    });

export default jobReducer;
