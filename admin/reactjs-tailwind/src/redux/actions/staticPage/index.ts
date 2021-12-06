/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as types from "redux/types/staticPage";
import {
  ICreateStaticPage,
  IRemoveStaticPages,
  IUpdateStaticPages,
} from "common/typings";

export const getAllPages = () => ({
  type: types.GET_ALL_PAGES,
});

export const getAllPagesSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_PAGES_SUCCESS,
  payload,
});

export const createPages = (payload: ICreateStaticPage) => ({
  type: types.CREATE_PAGE,
  payload,
});

export const updatePages = (payload: IUpdateStaticPages) => ({
  type: types.UPDATE_PAGE,
  payload,
});

export const removePages = (payload: IRemoveStaticPages) => ({
  type: types.REMOVE_PAGE,
  payload,
});
