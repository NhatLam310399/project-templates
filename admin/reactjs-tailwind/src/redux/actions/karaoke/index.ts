import * as types from "redux/types/karaoke";
import {
  IById,
  ICreateKaraoke,
  IGetAllKaraoke,
  IGetAllKaraokeHighlight,
  IUpdateKaraoke,
} from "common/typings";

export const getAllKaraoke = (payload: IGetAllKaraoke) => ({
  type: types.GET_ALL_KARAOKE,
  payload,
});

export const getAllKaraokeHighlight = (payload: IGetAllKaraokeHighlight) => ({
  type: types.GET_ALL_KARAOKE_HIGHLIGHT,
  payload,
});

export const getAllKaraokeHighlightSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_KARAOKE_HIGHLIGHT_SUCCESS,
  payload,
});

export const getAllKaraokeSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_KARAOKE_SUCCESS,
  payload,
});

export const createKaraoke = (payload: ICreateKaraoke) => ({
  type: types.CREATE_KARAOKE,
  payload,
});

export const getKaraokeById = (payload: IById) => ({
  type: types.GET_KARAOKE_BY_ID,
  payload,
});

export const getKaraokeSuccess = <T>(payload: T) => ({
  type: types.GET_KARAOKE_SUCCESS,
  payload,
});

export const updateKaraoke = (payload: IUpdateKaraoke) => ({
  type: types.UPDATE_KARAOKE,
  payload,
});

export const deleteKaraokeById = (payload: IById) => ({
  type: types.DELETE_KARAOKE_BY_ID,
  payload,
});

export const deleteAllKaraoke = () => ({
  type: types.DELETE_ALL_KARAOKE,
});

export const changeCompanyToKaraoke = (payload: IById) => ({
  type: types.CHANGE_COMPANY_TO_KARAOKE,
  payload,
});

export const changeKaraokeToCompany = (payload: IById) => ({
  type: types.CHANGE_KARAOKE_TO_COMPANY,
  payload,
});
