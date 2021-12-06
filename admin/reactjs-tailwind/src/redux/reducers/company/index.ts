import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/company";
import { IPlace } from "common/typings";

interface ICompanyState {
  allCompany: {
    results: IPlace[];
    totalCount: number;
  };
  allCompanyHighLight: {
    results: IPlace[];
    totalCount: number;
  };
  company: IPlace | null;
}

const initialState: ICompanyState = {
  allCompany: {
    results: [],
    totalCount: 0,
  },
  allCompanyHighLight: {
    results: [],
    totalCount: 0,
  },
  company: null,
};

const companyReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_COMPANY_SUCCESS:
        draft.allCompany = action.payload;
        break;
      case types.GET_ALL_COMPANY_HIGHLIGHT_SUCCESS:
        draft.allCompanyHighLight = action.payload;
        break;

      case types.GET_COMPANY_SUCCESS:
        draft.company = action.payload;
        break;

      default:
        break;
    }
  });

export default companyReducer;
