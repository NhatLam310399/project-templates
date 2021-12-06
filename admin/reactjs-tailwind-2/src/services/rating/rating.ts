import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
    IRatingCreateInput,
    IGetAllRating,
    IRatingUpdateInput,
    IRatingDelete,
} from "common/formatTypes";

const GET_ALL_RATING = gql`
    query ($filterRating: FilterRating, $page: Int, $size: Int) {
        getAllRatings(filterRating: $filterRating, page: $page, size: $size) {
            results {
                _id
                user {
                    _id
                    code
                    displayName
                    firstName
                    lastName
                    urlAvt {
                        default
                        medium
                        small
                    }
                    point
                    permission
                    enabled
                }
                rate
            }
            totalCount
        }
    }
`;
export const getAllRating = async (variable: IGetAllRating) => {
    const response = await graphQLCommon(GET_ALL_RATING, variable);
    return response;
};

const CREATE_RATING = gql`
    mutation ($ratingCreateInput: RatingCreateInput!) {
        createRating(ratingCreateInput: $ratingCreateInput) {
            user {
                point
            }
            rate
        }
    }
`;
export const createRating = async (variables: IRatingCreateInput) => {
    const result = await graphQLCommon(CREATE_RATING, variables);
    return result;
};
const UPDATE_RATING = gql`
    mutation ($ratingUpdateInput: RatingUpdateInput!, $id: String!) {
        updateRating(id: $id, ratingUpdateInput: $ratingUpdateInput) {
            _id
            user {
                point
            }
            rate
        }
    }
`;
export const updateRating = async (variables: IRatingUpdateInput) => {
    const result = await graphQLCommon(UPDATE_RATING, variables);
    return result;
};

const DELETE_RATING = gql`
    mutation ($id: String!) {
        deleteRatingById(id: $id)
    }
`;

export const deleteRating = async (variables: IRatingDelete) => {
    const results = await graphQLCommon(DELETE_RATING, variables);
    return results;
};
