import * as types from "redux/types/generalSetting";
import { IGetByLanguage, ISeo, IUpdateSeo } from "common/formatTypes";

export const getSeo = (payload: IGetByLanguage) => ({
    type: types.GET_SEO,
    payload,
});

export const getSeoSuccess = (payload: ISeo) => ({
    type: types.GET_SEO_SUCCESS,
    payload,
});

export const updateSeo = (payload: IUpdateSeo) => ({
    type: types.UPDATE_SEO,
    payload,
});
