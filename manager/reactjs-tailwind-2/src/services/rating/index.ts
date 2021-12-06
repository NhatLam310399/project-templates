import { gql } from "apollo-boost";
import {
  IById,
  IGetAllRating,
  IUpdateRating,
  ICreateRating,
} from "common/typings";

import { graphQLCommon } from "common/utils/api";

const GET_ALL_RATING = gql`
  query ($filterRating: FilterRating, $page: Int, $size: Int) {
    getAllRating(filterRating: $filterRating, page: $page, size: $size) {
      totalCount
      results {
        _id
        user {
          _id
          urlAvt {
            small
            default
          }
          displayName
          username
          email
          phoneNumber
        }
        place {
          _id
          name
          phoneNumber
        }
        rate
        content
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllRating = async (variables: IGetAllRating) => {
  const result = await graphQLCommon(GET_ALL_RATING, variables);
  return result;
};

const CREATE_RATING = gql`
  mutation ($RatingCreateInput: RatingCreateInput!) {
    createRating(RatingCreateInput: $RatingCreateInput) {
      _id
    }
  }
`;

export const createRating = async (variables: ICreateRating) => {
  const response = await graphQLCommon(CREATE_RATING, variables);
  return response;
};

const UPDATE_RATING = gql`
  mutation ($id: String!, $RatingUpdateInput: RatingUpdateInput!) {
    updateRating(id: $id, RatingUpdateInput: $RatingUpdateInput) {
      _id
    }
  }
`;

export const updateRating = async (variables: IUpdateRating) => {
  const response = await graphQLCommon(UPDATE_RATING, variables);
  return response;
};

const DELETE_RATING = gql`
  mutation ($id: String!) {
    deleteRatingById(id: $id)
  }
`;

export const deleteRatingById = async (variables: IById) => {
  const response = await graphQLCommon(DELETE_RATING, variables);
  return response;
};
