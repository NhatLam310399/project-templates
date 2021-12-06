import * as types from "redux/types/generalSetting";
import {
    IUpdateContentWebsite,
    IContentWebsite,
} from "common/formatTypes/GeneralSetting";
import { IGetById } from "common/formatTypes";

export const getContentWebsiteById = (payload: IGetById) => ({
    type: types.GET_CONTENT_WEBSITE_BY_ID,
    payload,
});
export const getContentWebsiteByIdSuccess = (payload: IContentWebsite) => ({
    type: types.GET_CONTENT_WEBSITE_BY_ID_SUCCESS,
    payload,
});
export const updateContentWebsite = (payload: IUpdateContentWebsite) => ({
    type: types.UPDATE_CONTENT_WEBSITE,
    payload,
});
