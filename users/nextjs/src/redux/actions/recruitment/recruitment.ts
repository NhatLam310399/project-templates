import * as types from "@redux/types/recruitment";
import {
  ICreateRecruitment,
  IGetAllRecruitment,
  IGetBestRecruitment,
  IGetById,
  IGetBySlug,
  IGetRecruitmentByCompany,
  IGetRecruitmentByUser,
  IRecruitment,
  IRemoveSavedRecruitment,
  ISetAppliedRecruitment,
  ISetSavedRecruitment,
  ISetSeenRecruitment,
} from "@common/typings";

export const getAllRecruitment = (payload: IGetAllRecruitment) => ({
  type: types.GET_ALL_RECRUITMENT,
  payload,
});

export const getRecruitmentByCompany = (payload: IGetRecruitmentByCompany) => ({
  type: types.GET_RECRUITMENT_BY_COMPANY,
  payload,
});

export const getRecruitmentByUser = (payload: IGetRecruitmentByUser) => ({
  type: types.GET_RECRUITMENT_BY_USER,
  payload,
});

export const getAllRecruitmentSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_RECRUITMENT_SUCCESS,
  payload,
});

export const getRecruitmentById = (payload: IGetById) => ({
  type: types.GET_RECRUITMENT_BY_ID,
  payload,
});

export const getRecruitmentByIdSuccess = <T>(payload: T) => ({
  type: types.GET_RECRUITMENT_BY_ID_SUCCESS,
  payload,
});

export const getRecruitmentBySlug = (payload: IGetBySlug) => ({
  type: types.GET_RECRUITMENT_BY_SLUG,
  payload,
});

export const getRecruitmentBySlugSuccess = <T>(payload: T) => ({
  type: types.GET_RECRUITMENT_BY_SLUG_SUCCESS,
  payload,
});
export const setSeenRecruitment = (payload: ISetSeenRecruitment) => ({
  type: types.SET_SEEN_RECRUITMENT,
  payload,
});
export const setAppliedRecruitment = (payload: ISetAppliedRecruitment) => ({
  type: types.SET_APPLIED_RECRUITMENT,
  payload,
});

export const setSavedRecruitment = (payload: ISetSavedRecruitment) => ({
  type: types.SET_SAVED_RECRUITMENT,
  payload,
});

export const removeSavedRecruitment = (payload: IRemoveSavedRecruitment) => ({
  type: types.REMOVE_SAVED_RECRUITMENT,
  payload,
});

export const createRecruitment = (payload: ICreateRecruitment) => ({
  type: types.CREATE_RECRUITMENT,
  payload,
});

export const getBestRecruitment = (payload: IGetBestRecruitment) => ({
  type: types.GET_BEST_RECRUITMENT,
  payload,
});

export const getBestRecruitmentSuccess = <T>(payload: T) => ({
  type: types.GET_BEST_RECRUITMENT_SUCCESS,
  payload,
});
