import * as types from "@redux/types/workLocation";
import {
  ICreateWorkLocation,
  IDeleteWorkLocation,
  IGetWorkLocationByCompany,
  IUpdateWorkLocation,
} from "@common/typings";

export const getWorkLocation = () => ({
  type: types.GET_ALL_WORK_LOCATION,
});

export const getWorkLocationSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_WORK_LOCATION_SUCCESS,
  payload,
});

export const getWorkLocationByCompany = (
  payload: IGetWorkLocationByCompany,
) => ({
  type: types.GET_WORK_LOCATION_BY_COMPANY,
  payload,
});

export const getWorkLocationByCompanySuccess = <T>(payload: T) => ({
  type: types.GET_WORK_LOCATION_BY_COMPANY_SUCCESS,
  payload,
});

export const createWorkLocation = (payload: ICreateWorkLocation) => ({
  type: types.CREATE_WORK_LOCATION,
  payload,
});

export const deleteWorkLocation = (payload: IDeleteWorkLocation) => ({
  type: types.DELETE_WORK_LOCATION,
  payload,
});

export const updateWorkLocation = (payload: IUpdateWorkLocation) => ({
  type: types.UPDATE_WORK_LOCATION,
  payload,
});
