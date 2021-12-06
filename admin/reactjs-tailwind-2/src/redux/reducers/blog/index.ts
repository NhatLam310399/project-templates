import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/blog";
import { ICareerCounseling, ICategory, ITag } from "common/formatTypes";

interface ICareerCounselingReducer {
    allCareerCounseling: {
        results: ICareerCounseling[];
        totalCount: number;
        loading: boolean;
    };
    allCategory: {
        results: ICategory[];
        totalCount: 0;
        loading: boolean;
    };
    allTag: {
        results: ITag[];
        totalCount: 0;
        loading: boolean;
    };
}

const initialState: ICareerCounselingReducer = {
    allCareerCounseling: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    allCategory: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    allTag: {
        results: [],
        totalCount: 0,
        loading: true,
    },
};

const benefitReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_ALL_CAREER_COUNSELING_SUCCESS:
                draft.allCareerCounseling = {
                    ...actions.payload,
                    loading: false,
                };
                break;
            case types.GET_ALL_CATEGORY_SUCCESS:
                draft.allCategory = { ...actions.payload, loading: false };
                break;
            case types.GET_ALL_TAG_SUCCESS:
                draft.allTag = { ...actions.payload, loading: false };
                break;
            default:
                break;
        }
    });

export default benefitReducer;
