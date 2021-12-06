import * as types from "@redux/types/company";
import {
  IGetAllCompany,
  IGetBySlug,
  IGetCompany,
  ISetSeenCompany,
  ISetSubscribeCompany,
  IUpdateCompany,
} from "@common/typings";

export const getAllCompany = (payload: IGetAllCompany) => ({
  type: types.GET_ALL_COMPANY,
  payload,
});

export const getAllCompanySuccess = <T>(payload: T) => ({
  type: types.GET_ALL_COMPANY_SUCCESS,
  payload,
});

export const getCompany = (payload: IGetCompany) => ({
  type: types.GET_COMPANY,
  payload,
});

export const getCompanySuccess = <T>(payload: T) => ({
  type: types.GET_COMPANY_SUCCESS,
  payload,
});

export const updateCompany = (payload: IUpdateCompany) => ({
  type: types.UPDATE_COMPANY,
  payload,
});

export const updateCompanyProvince = () => ({
  type: types.UPDATE_COMPANY_PROVINCE,
});

export const setSubscribeCompany = (payload: ISetSubscribeCompany) => ({
  type: types.SET_SUBSCRIBE_COMPANY,
  payload,
});

export const setSeenCompany = (payload: ISetSeenCompany) => ({
  type: types.SET_SEEN_COMPANY,
  payload,
});

export const getNewestCompany = (payload: IGetAllCompany) => ({
  type: types.GET_NEWEST_COMPANY,
  payload,
});

export const getNewestCompanySuccess = <T>(payload: T) => ({
  type: types.GET_NEWEST_COMPANY_SUCCESS,
  payload,
});

export const getMostViewCompany = (payload: IGetAllCompany) => ({
  type: types.GET_MOST_VIEW_COMPANY,
  payload,
});

export const getMostViewCompanySuccess = <T>(payload: T) => ({
  type: types.GET_MOST_VIEW_COMPANY_SUCCESS,
  payload,
});

export const getMostAppliedCompany = (payload: IGetAllCompany) => ({
  type: types.GET_MOST_APPLIED_COMPANY,
  payload,
});

export const getMostAppliedCompanySuccess = <T>(payload: T) => ({
  type: types.GET_MOST_APPLIED_COMPANY_SUCCESS,
  payload,
});

export const getMostRecruitingCompany = (payload: IGetAllCompany) => ({
  type: types.GET_MOST_RECRUITING_COMPANY,
  payload,
});

export const getMostRecruitingCompanySuccess = <T>(payload: T) => ({
  type: types.GET_MOST_RECRUITING_COMPANY_SUCCESS,
  payload,
});

export const getCompanyBySlug = (payload: IGetBySlug) => ({
  type: types.GET_COMPANY_BY_SLUG,
  payload,
});

export const getCompanyBySlugSuccess = <T>(payload: T) => ({
  type: types.GET_COMPANY_BY_SLUG_SUCCESS,
  payload,
});
