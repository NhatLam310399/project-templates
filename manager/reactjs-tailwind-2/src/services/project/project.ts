import { gql } from "apollo-boost";
import {
  IById,
  IGetAllProject,
  IUpdateProject,
  ICreateProject,
} from "common/typings";

import { graphQLCommon } from "common/utils/api";

const GET_ALL_PROJECT = gql`
  query ($filterProject: FilterProject, $page: Int, $size: Int) {
    getAllProject(filterProject: $filterProject, page: $page, size: $size) {
      totalCount
      results {
        _id
        images {
          default
          small
        }
        detail
        checkDownload
        video
        name
        introduce
        keywords
        slug
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllProject = async (variables: IGetAllProject) => {
  const result = await graphQLCommon(GET_ALL_PROJECT, variables);
  return result;
};

const CREATE_PROJECT = gql`
  mutation ($projectCreateInput: ProjectCreateInput!) {
    createProject(projectCreateInput: $projectCreateInput) {
      _id
    }
  }
`;

export const createProject = async (variables: ICreateProject) => {
  const response = await graphQLCommon(CREATE_PROJECT, variables);
  return response;
};

const UPDATE_PROJECT = gql`
  mutation ($id: String!, $projectUpdateInput: ProjectUpdateInput!) {
    updateProject(id: $id, projectUpdateInput: $projectUpdateInput) {
      _id
    }
  }
`;

export const updateProject = async (variables: IUpdateProject) => {
  const response = await graphQLCommon(UPDATE_PROJECT, variables);
  return response;
};

const DELETE_PROJECT = gql`
  mutation ($id: String!) {
    deleteProjectById(id: $id)
  }
`;

export const deleteProjectById = async (variables: IById) => {
  const response = await graphQLCommon(DELETE_PROJECT, variables);
  return response;
};
