import * as types from "redux/types/document";
import {
  IById,
  ICreateDocument,
  IGetAllDocument,
  IUpdateDocument,
} from "common/typings";

export const getAllDocument = (payload: IGetAllDocument) => ({
  type: types.GET_ALL_DOCUMENT,
  payload,
});

export const getAllDocumentSuccess = <T>(payload: T) => ({
  type: types.GET_ALL_DOCUMENT_SUCCESS,
  payload,
});

export const createDocument = (payload: ICreateDocument) => ({
  type: types.CREATE_DOCUMENT,
  payload,
});

export const updateDocument = (payload: IUpdateDocument) => ({
  type: types.UPDATE_DOCUMENT,
  payload,
});

export const deleteDocument = (payload: IById) => ({
  type: types.DELETE_DOCUMENT,
  payload,
});
