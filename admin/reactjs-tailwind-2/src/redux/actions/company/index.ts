import * as types from "redux/types/company";
import {
    IGetById,
    ICreateCompany,
    IGetCompanies,
    IUpdateCompany,
} from "common/formatTypes";

export const getCompanies = (payload: IGetCompanies) => ({
    type: types.GET_COMPANIES,
    payload,
});

export const getCompaniesSuccess = <T>(payload: T) => ({
    type: types.GET_COMPANIES_SUCCESS,
    payload,
});

export const getCompanyById = (payload: IGetById) => ({
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

export const deleteCompany = (payload: IGetById) => ({
    type: types.DELETE_COMPANY,
    payload,
});
