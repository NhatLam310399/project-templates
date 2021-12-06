import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";
import {
  IDeleteWorkLocation,
  IGetWorkLocationByCompany,
  IUpdateWorkLocation,
  IWorkLocationInput,
} from "@common/typings";

const GET_ALL_WORK_LOCATION = gql`
  query Query {
    getAllWorkLocation {
      results {
        _id
        location
        province {
          name
        }
      }
      totalCount
    }
  }
`;

export const getAllWorkLocation = async (variables: any) => {
  const response = await graphQLCommon(GET_ALL_WORK_LOCATION, {});
  return response;
};

const GET_WORK_LOCATION_BY_COMPANY = gql`
  query Query($companyId: String) {
    getWorkLocationByCompany(companyId: $companyId) {
      results {
        company {
          _id
          name
        }
        _id
        name
        province {
          name
          _id
        }
        location
      }
      totalCount
    }
  }
`;

export const getWorkLocationByCompany = async (
  variables: IGetWorkLocationByCompany,
) => {
  const response = await graphQLCommon(GET_WORK_LOCATION_BY_COMPANY, variables);
  return response;
};

const CREATE_WORK_LOCATION = gql`
  mutation CreateWorkLocationMutation(
    $workLocationInput: WorkLocationCreateInput!
  ) {
    createWorkLocation(workLocationInput: $workLocationInput) {
      _id
      name
    }
  }
`;

export const createWorkLocation = async (variables: IWorkLocationInput) => {
  const response = await graphQLCommon(CREATE_WORK_LOCATION, variables);
  return response;
};

const DELETE_WORK_LOCATION = gql`
  mutation DeleteWorkLocationMutation($id: String!) {
    deleteWorkLocation(id: $id)
  }
`;

export const deleteWorkLocation = async (variables: IDeleteWorkLocation) => {
  const response = await graphQLCommon(DELETE_WORK_LOCATION, variables);
  return response;
};

const UPDATE_WORK_LOCATION = gql`
  mutation UpdateWorkLocationMutation(
    $id: String!
    $workLocationInput: WorkLocationUpdateInput!
  ) {
    updateWorkLocation(id: $id, workLocationInput: $workLocationInput) {
      _id
      name
    }
  }
`;

export const updateWorkLocation = async (variables: IUpdateWorkLocation) => {
  const response = await graphQLCommon(UPDATE_WORK_LOCATION, variables);
  return response;
};
