import * as types from "redux/types/request";
import {
  IAcceptRequest,
  IDeleteRequest,
  IGetAllRequest,
  IGetRequestById,
} from "common/typings";

export const getAllRequest = (payload: IGetAllRequest) => ({
  type: types.GET_ALL_REQUEST,
  payload,
});

export const getAllRequestSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_REQUEST_SUCCESS,
  payload,
});

export const getRequestById = (payload: IGetRequestById) => ({
  type: types.GET_REQUEST_BY_ID,
  payload,
});

export const getRequestByIdSuccess = <T>(payload: T) => ({
  type: types.GET_REQUEST_BY_ID_SUCCESS,
  payload,
});

export const acceptRequest = (payload: IAcceptRequest) => ({
  type: types.ACCEPT_REQUEST,
  payload,
});

export const deleteRequest = (payload: IDeleteRequest) => ({
  type: types.DELETE_REQUEST,
  payload,
});
