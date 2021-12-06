import * as types from "redux/types/request";
import { ICreateRequest } from "common/typings";

export const createRequest = (payload: ICreateRequest) => ({
  type: types.CREATE_REQUEST,
  payload,
});
