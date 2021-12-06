import { gql } from "apollo-boost";
import {
  IById,
  ICreateClosingTime,
  IGetAllClosingTime,
  IUpdateClosingTime,
} from "common/typings";

import { graphQLCommon } from "common/utils/api";

const GET_ALL_CLOSING_TIME = gql`
  query ($page: Int, $size: Int, $filterClosingTime: FilterClosingTime) {
    getAllClosingTime(
      page: $page
      size: $size
      filterClosingTime: $filterClosingTime
    ) {
      totalCount
      results {
        _id
        karaoke {
          _id
          name
        }
        room {
          _id
          name
          price
          place {
            _id
            name
          }
          image {
            default
            small
          }
        }
        dayOffStart
        dayOffEnd
        createdAt
        updatedAt
      }
    }
  }
`;
export const getAllClosingTime = async (variables: IGetAllClosingTime) => {
  const result = await graphQLCommon(GET_ALL_CLOSING_TIME, variables);
  return result;
};

const CREATE_CLOSING_TIME = gql`
  mutation ($closingTimeCreateInput: ClosingTimeCreateInput!) {
    createClosingTime(closingTimeCreateInput: $closingTimeCreateInput) {
      _id
    }
  }
`;
export const createClosingTime = async (variables: ICreateClosingTime) => {
  const result = await graphQLCommon(CREATE_CLOSING_TIME, variables);
  return result;
};

const UPDATE_CLOSING_TIME = gql`
  mutation ($id: String!, $closingTimeUpdateInput: ClosingTimeUpdateInput!) {
    updateClosingTime(
      id: $id
      closingTimeUpdateInput: $closingTimeUpdateInput
    ) {
      _id
    }
  }
`;
export const updateClosingTime = async (variables: IUpdateClosingTime) => {
  const result = await graphQLCommon(UPDATE_CLOSING_TIME, variables);
  return result;
};

const DELETE_CLOSING_TIME_BY_ID = gql`
  mutation ($id: String!) {
    deleteClosingTimeById(id: $id)
  }
`;
export const deleteClosingTimeById = async (variables: IById) => {
  const result = await graphQLCommon(DELETE_CLOSING_TIME_BY_ID, variables);
  return result;
};
