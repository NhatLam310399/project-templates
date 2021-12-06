import { gql } from "apollo-boost";
import {
  ICreateRequestReviewInput,
  IGetAllRequestReview,
  IGetByUserId,
} from "@common/typings";
import { graphQLCommon } from "@common/utils/api";

const GET_ALL_REQUEST_REVIEW = gql`
  query($filterRequestReview: FilterRequestReview, $page: Int, $size: Int) {
    getAllRequestReview(
      filterRequestReview: $filterRequestReview
      page: $page
      size: $size
    ) {
      results {
        _id
        candidate {
          _id
          email
        }
        employer {
          company {
            _id
            name
            career {
              name
            }
            location
            logo {
              default
              small
              medium
            }
          }
          email
        }
        status
        evaluate {
          answer1 {
            name
            point
          }
          answer2 {
            name
            point
          }
          answer3 {
            name
            point
          }
          answer4 {
            name
            point
          }
          answer5 {
            name
            point
          }
          answer6 {
            name
            point
          }
          answer7 {
            name
            point
          }
          answer8 {
            name
            point
          }
          answer9 {
            name
            point
          }
          answer10 {
            name
            point
          }
          avgPoint
        }
      }
      totalCount
    }
  }
`;

export const getAllRequestReview = async (variable: IGetAllRequestReview) => {
  const response = await graphQLCommon(GET_ALL_REQUEST_REVIEW, variable);
  return response;
};

const GET_EVALUATE_BY_USER = gql`
  query($userId: String!) {
    getEvaluateByUser(userId: $userId) {
      _id
      evaluator {
        company {
          name
          career {
            name
          }
          location
          logo {
            default
            small
            medium
          }
        }
      }
      answer1 {
        name
        point
      }
      answer2 {
        name
        point
      }
      answer3 {
        name
        point
      }
      answer4 {
        name
        point
      }
      answer5 {
        name
        point
      }
      answer6 {
        name
        point
      }
      answer7 {
        name
        point
      }
      answer8 {
        name
        point
      }
      answer9 {
        name
        point
      }
      answer10 {
        name
        point
      }
      avgPoint
    }
  }
`;

export const getEvaluateByUser = async (variable: IGetByUserId) => {
  const response = await graphQLCommon(GET_EVALUATE_BY_USER, variable);
  return response;
};

const CREATE_REQUEST_REVIEW = gql`
  mutation($createRequestReviewInput: CreateRequestReviewInput) {
    createRequestReview(createRequestReviewInput: $createRequestReviewInput) {
      _id
    }
  }
`;

export const createRequestReview = async (
  variable: ICreateRequestReviewInput,
) => {
  const response = await graphQLCommon(CREATE_REQUEST_REVIEW, variable);

  return response;
};
