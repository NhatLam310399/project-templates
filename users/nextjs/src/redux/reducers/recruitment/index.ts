import produce from "immer";
import { AnyAction } from "redux";
import * as types from "@redux/types/recruitment";
import { IRecruitment, IMostKeyword } from "@common/typings";
import { IOption } from "@designs/Select";

interface RecruitmentReducer {
  allRecruitment: {
    results: IRecruitment[];
    totalCount: number;
    loading: boolean;
  };
  bestRecruitment: {
    results: IRecruitment[];
    totalCount: number;
    loading: boolean;
  };
  mostKeyword: IMostKeyword[];
  recruitment: IRecruitment;
  recruitmentDetail: IRecruitment;
  sortTypeSelected: IOption;
}

const initialState: RecruitmentReducer = {
  allRecruitment: {
    results: [],
    totalCount: 0,
    loading: true,
  },
  bestRecruitment: {
    results: [],
    totalCount: 0,
    loading: true,
  },
  recruitment: {},
  recruitmentDetail: {},
  mostKeyword: [],
  sortTypeSelected: null,
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_RECRUITMENT_SUCCESS:
        draft.allRecruitment = { ...action.payload, loading: false };
        break;
      case types.GET_RECRUITMENT_BY_ID_SUCCESS:
        draft.recruitment = action.payload;
        break;
      case types.GET_RECRUITMENT_BY_SLUG_SUCCESS:
        draft.recruitmentDetail = action.payload;
        break;
      case types.GET_BEST_RECRUITMENT_SUCCESS:
        draft.bestRecruitment = { ...action.payload, loading: false };
        break;
      case types.GET_MOST_KEYWORD_SUCCESS:
        draft.mostKeyword = action.payload;
        break;
      case types.SET_SORT_TYPE_SELECTED:
        draft.sortTypeSelected = action.payload;
        break;
      default:
        break;
    }
  });

export default reducer;
