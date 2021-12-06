import * as types from "redux/types/document";
import {
  IById,
  ICreateBasicDocument,
  IGetAllBasicDocument,
  IUpdateBasicDocument,
} from "common/typings";

export const getAllBasicDocument = (payload: IGetAllBasicDocument) => ({
  type: types.GET_ALL_BASIC_DOCUMENT,
  payload,
});

export const getAllBasicDocumentSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_BASIC_DOCUMENT_SUCCESS,
  payload,
});

export const createBasicDocument = (payload: ICreateBasicDocument) => ({
  type: types.CREATE_BASIC_DOCUMENT,
  payload,
});

export const updateBasicDocument = (payload: IUpdateBasicDocument) => ({
  type: types.UPDATE_BASIC_DOCUMENT,
  payload,
});

export const deleteBasicDocument = (payload: IById) => ({
  type: types.DELETE_BASIC_DOCUMENT,
  payload,
});
