import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/newsConfig";
import {
    IKeyword,
    ICategoryLevel1,
    ICategoryLv2,
    IJobLevel,
    IJobType,
    IBenefit,
} from "common/formatTypes";

interface INewsConfigState {
    allCategoryLevel1: {
        results: ICategoryLevel1[];
        totalCount: number;
        loading: boolean;
    };
    categoryLv2: {
        results: ICategoryLv2[];
        totalCount: number;
        loading: boolean;
    };

    allJobLevel: {
        results: IJobLevel[];
        totalCount: number;
        loading: boolean;
    };
    allJobType: {
        results: IJobType[];
        totalCount: number;
        loading: boolean;
    };
    allBenefit: {
        results: IBenefit[];
        totalCount: number;
        loading: boolean;
    };
    allKeyword: {
        results: IKeyword[];
        totalCount: number;
        loading: boolean;
    };
}

const initialState: INewsConfigState = {
    allCategoryLevel1: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    categoryLv2: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    allJobLevel: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    allJobType: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    allBenefit: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    allKeyword: {
        results: [],
        totalCount: 0,
        loading: true,
    },
};

const newsConfigReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_ALL_CATEGORY_LEVEL1_SUCCESS:
                draft.allCategoryLevel1 = {
                    ...actions.payload,
                    loading: false,
                };
                break;
            case types.GET_ALL_CATEGORY_LEVEL_2_SUCCESS:
                draft.categoryLv2 = { ...actions.payload, loading: false };
                break;
            case types.GET_ALL_JOB_LEVEL_SUCCESS:
                draft.allJobLevel = { ...actions.payload, loading: false };
                break;
            case types.GET_ALL_JOB_TYPE_SUCCESS:
                draft.allJobType = { ...actions.payload, loading: false };
                break;
            case types.GET_ALL_BENEFIT_SUCCESS:
                draft.allBenefit = { ...actions.payload, loading: false };
                break;
            case types.GET_ALL_KEYWORD_SUCCESS:
                draft.allKeyword = { ...actions.payload, loading: false };
                break;
            default:
        }
    });

export default newsConfigReducer;
