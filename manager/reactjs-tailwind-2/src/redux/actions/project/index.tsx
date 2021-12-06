import * as types from "redux/types/project";
import {
  IById,
  ICreateProject,
  IGetAllProject,
  IUpdateProject,
} from "common/typings";

export const getAllProject = (payload: IGetAllProject) => ({
  type: types.GET_ALL_PROJECT,
  payload,
});

export const getAllProjectSuccess = <T,>(payload: T) => ({
  type: types.GET_ALL_PROJECT_SUCCESS,
  payload,
});

export const createProject = (payload: ICreateProject) => ({
  type: types.CREATE_PROJECT,
  payload,
});

export const updateProject = (payload: IUpdateProject) => ({
  type: types.UPDATE_PROJECT,
  payload,
});

export const deleteProject = (payload: IById) => ({
  type: types.DELETE_PROJECT,
  payload,
});
