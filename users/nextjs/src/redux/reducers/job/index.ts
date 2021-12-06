import produce from "immer";
import * as types from "@redux/types/job";
import { AnyAction } from "redux";
import {
  IJobType,
  IJobLevel,
  ILevelPrice,
  ICategoryLevel2,
} from "@common/typings";

interface JobStateTypes {
  allJobType: IJobType[];
  allJobLevel: IJobLevel[];
  allJobLevelFilter: IJobLevel[];
  allLevelPrice: ILevelPrice[];
  jobLevelSelected: IJobLevel;
  levelPriceSelected: ILevelPrice;
  jobTypeSelected: IJobType;
}

const initialState: JobStateTypes = {
  allJobType: [],
  allJobLevel: [],
  allJobLevelFilter: [],
  allLevelPrice: [],
  jobLevelSelected: null,
  levelPriceSelected: null,
  jobTypeSelected: null,
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_JOB_TYPE_SUCCESS:
        draft.allJobType = action.payload.results;
        break;
      case types.GET_ALL_JOB_LEVEL_SUCCESS:
        draft.allJobLevel = action.payload.results;
        break;
      case types.GET_ALL_JOB_LEVEL_FILTER_SUCCESS:
        draft.allJobLevelFilter = action.payload.results;
        break;
      case types.GET_ALL_LEVEL_PRICE_SUCCESS:
        draft.allLevelPrice = action.payload.results;
        break;
      case types.SET_JOB_TYPE_SELECTED:
        draft.jobTypeSelected = action.payload;
        break;
      case types.SET_JOB_LEVEL_SELECTED:
        draft.jobLevelSelected = action.payload;
        break;
      case types.SET_LEVEL_PRICE_SELECTED:
        draft.levelPriceSelected = action.payload;
        break;

      default:
        break;
    }
  });

export default reducer;
