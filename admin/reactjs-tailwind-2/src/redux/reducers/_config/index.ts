import producer from "immer";
import * as types from "redux/types/_config";
import { IBreadcrumb, ILanguage } from "common/formatTypes";
import { LANGUAGE_KEY } from "constants/localStore";

export interface IConfig {
    isExtendDrawer: boolean;
    breadcrumb: IBreadcrumb;
    language: ILanguage;
    isCollapse: boolean;
    isHoverDrawer: boolean;
}

const initialState: IConfig = {
    isExtendDrawer: false,
    breadcrumb: [],
    language: "vi",
    isCollapse: false,
    isHoverDrawer: false,
};

const configReducer = (state = initialState, actions: any) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.SET_LANGUAGE:
                localStorage.setItem(LANGUAGE_KEY, actions.payload);
                draft.language = actions.payload;
                break;
            case types.SET_EXTEND_DRAWER:
                draft.isExtendDrawer = actions.payload;
                break;
            case types.SET_BREADCRUMB:
                draft.breadcrumb = actions.payload;
                break;
            case types.SET_COLLAPSE_DRAWER:
                draft.isCollapse = actions.payload;
                break;
            case types.SET_HOVER_DRAWER:
                draft.isHoverDrawer = actions.payload;
                break;
            default:
                break;
        }
    });

export default configReducer;
