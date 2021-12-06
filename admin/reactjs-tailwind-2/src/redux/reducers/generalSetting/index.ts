import producer from "immer";
import { AnyAction } from "redux";
import { ISeo, IPages, IContentWebsite } from "common/formatTypes";
import * as types from "redux/types/generalSetting";

interface IGeneralSettingState {
    pages: {
        results: IPages[];
        totalCount: number;
        loading: boolean;
    };
    seo: ISeo;
    contentWebsite: IContentWebsite;
}
const initialState: IGeneralSettingState = {
    pages: {
        results: [],
        totalCount: 0,
        loading: true,
    },
    seo: {},
    contentWebsite: {},
};

const generalSettingReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            // PAGES
            case types.GET_ALL_PAGES_SUCCESS:
                draft.pages = { ...actions.payload, loading: false };
                break;
            // SEO
            case types.GET_SEO_SUCCESS:
                draft.seo = actions.payload;
                break;
            // CONTENT WEBSITE
            case types.GET_CONTENT_WEBSITE_BY_ID_SUCCESS:
                draft.contentWebsite = actions.payload;
                break;
            default:
                break;
        }
    });

export default generalSettingReducer;
