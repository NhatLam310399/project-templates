import * as types from "redux/types/company";
import {
  IById,
  ICreateCompany,
  IGetAllCompany,
  IGetAllCompanyHighlight,
  ISetPlaceHighlight,
  IUpdateCompany,
} from "common/typings";

export const getAllCompany = (payload: IGetAllCompany) => ({
  type: types.GET_ALL_COMPANY,
  payload,
});
export const getAllCompanySuccess = <T>(payload: T) => ({
  type: types.GET_ALL_COMPANY_SUCCESS,
  payload,
});
export const getAllCompanyHighlight = (payload: IGetAllCompanyHighlight) => ({
  type: types.GET_ALL_COMPANY_HIGHLIGHT,
  payload,
});
export const getAllCompanyHighlightSuccess = (
  payload: IGetAllCompanyHighlight,
) => ({
  type: types.GET_ALL_COMPANY_HIGHLIGHT_SUCCESS,
  payload,
});

export const getCompanyById = (payload: IById) => ({
  type: types.GET_COMPANY_BY_ID,
  payload,
});

export const getCompanySuccess = <T>(payload: T) => ({
  type: types.GET_COMPANY_SUCCESS,
  payload,
});

export const createCompany = (payload: ICreateCompany) => ({
  type: types.CREATE_COMPANY,
  payload,
});

export const updateCompany = (payload: IUpdateCompany) => ({
  type: types.UPDATE_COMPANY,
  payload,
});

export const deleteCompanyById = (payload: IById) => ({
  type: types.DELETE_COMPANY_BY_ID,
  payload,
});

export const deleteAllCompany = () => ({
  type: types.DELETE_ALL_COMPANY,
});
export const setIsPlaceHighlight = (payload: ISetPlaceHighlight) => ({
  type: types.SET_PLACE_HIGHLIGHT,
  payload,
});
