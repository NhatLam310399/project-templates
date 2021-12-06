import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/company";
import { ICompany } from "common/formatTypes";

interface ICompanyReducer {
    allCompany: {
        results: ICompany[];
        totalCount: number;
    };
    company: ICompany | null;
}

const initialState: ICompanyReducer = {
    allCompany: {
        results: [],
        totalCount: 0,
    },
    company: null,
};

const companyReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.GET_COMPANIES_SUCCESS:
                draft.allCompany = actions.payload;
                break;
            case types.GET_COMPANY_SUCCESS:
                draft.company = actions.payload;
                break;
            default:
                break;
        }
    });

export default companyReducer;
