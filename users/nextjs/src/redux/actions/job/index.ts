import {
  ICategoryLevel2,
  IGetAllJobType,
  IGetAllLevelPrice,
  IJobLevel,
  IJobType,
  ILevelPrice,
} from "@common/typings";
import * as types from "@redux/types/job";
import * as typesCate from "@redux/types/category";

export const getAllJobType = (payload: IGetAllJobType) => ({
  type: types.GET_ALL_JOB_TYPE,
  payload,
});

export const getAllJobTypeSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_JOB_TYPE_SUCCESS,
  payload,
});

export const getAllJobLevel = () => ({
  type: types.GET_ALL_JOB_LEVEL,
});

export const getAllJobLevelSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_JOB_LEVEL_SUCCESS,
  payload,
});

export const getAllJobLevelFilter = () => ({
  type: types.GET_ALL_JOB_LEVEL_FILTER,
});

export const getAllJobLevelFilterSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_JOB_LEVEL_FILTER_SUCCESS,
  payload,
});

export const getAllLevelPrice = (payload: IGetAllLevelPrice) => ({
  type: types.GET_ALL_LEVEL_PRICE,
  payload,
});

export const getAllLevelPriceSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_LEVEL_PRICE_SUCCESS,
  payload,
});

export const setJobLevelSelected = (payload: IJobLevel) => ({
  type: types.SET_JOB_LEVEL_SELECTED,
  payload,
});

export const setLevelPriceSelected = (payload: ILevelPrice) => ({
  type: types.SET_LEVEL_PRICE_SELECTED,
  payload,
});

export const setJobTypeSelected = (payload: IJobType) => ({
  type: types.SET_JOB_TYPE_SELECTED,
  payload,
});
