import produce from "immer";
import { AnyAction } from "redux";
import * as types from "@redux/types/company";
import { ICompany } from "@common/typings";

interface CompanyReducer {
  allCompany: {
    results: ICompany[];
    totalCount: number;
    loading: boolean;
  };
  company: ICompany;
  newestCompanies: {
    results: ICompany[];
  };
  mostViewCompanies: {
    results: ICompany[];
  };
  mostAppliedCompanies: {
    results: ICompany[];
  };
  mostRecruitingCompanies: {
    results: ICompany[];
  };
  companyDetail: ICompany;
}

const initialState: CompanyReducer = {
  allCompany: {
    results: [],
    totalCount: 0,
    loading: true,
  },
  company: {},
  newestCompanies: {
    results: [],
  },
  mostViewCompanies: {
    results: [],
  },
  mostAppliedCompanies: {
    results: [],
  },
  mostRecruitingCompanies: {
    results: [],
  },
  companyDetail: {},
};

const reducer = (state = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_ALL_COMPANY_SUCCESS:
        draft.allCompany = { ...action.payload, loading: false };
        break;
      case types.GET_COMPANY_SUCCESS:
        draft.company = action.payload;
        break;
      case types.GET_NEWEST_COMPANY_SUCCESS:
        draft.newestCompanies = action.payload;
        break;
      case types.GET_MOST_VIEW_COMPANY_SUCCESS:
        draft.mostViewCompanies = action.payload;
        break;
      case types.GET_MOST_APPLIED_COMPANY_SUCCESS:
        draft.mostAppliedCompanies = action.payload;
        break;
      case types.GET_MOST_RECRUITING_COMPANY_SUCCESS:
        draft.mostRecruitingCompanies = action.payload;
        break;
      case types.GET_COMPANY_BY_SLUG_SUCCESS:
        draft.companyDetail = action.payload;
        break;
      default:
        break;
    }
  });

export default reducer;
