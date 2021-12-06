import { gql } from "apollo-boost";
import {
    IGetById,
    ICreateCareerCounseling,
    IGetCareerCounseling,
    IUpdateCareerCounseling,
} from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_CAREER_COUNSELING = gql`
    query (
        $filterCareerCounseling: FilterCareerCounseling
        $page: Int
        $size: Int
    ) {
        getAllCareerCounseling(
            filterCareerCounseling: $filterCareerCounseling
            page: $page
            size: $size
        ) {
            results {
                _id
                name
                urlImage {
                    default
                    medium
                    small
                }
                tags {
                    _id
                    name
                }
                category {
                    _id
                    name
                }
                enabled
                description
                content
            }
            totalCount
        }
    }
`;

export const getAllCareerCounseling = async (
    variables: IGetCareerCounseling,
) => {
    const response = await graphQLCommon(GET_ALL_CAREER_COUNSELING, variables);
    return response;
};

const CREATE_CAREER_COUNSELING = gql`
    mutation ($careerCounselingInput: CareerCounselingCreateInput!) {
        createCareerCounseling(
            careerCounselingCreateInput: $careerCounselingInput
        ) {
            _id
            name
        }
    }
`;

export const createCareerCounseling = async (
    variables: ICreateCareerCounseling,
) => {
    const response = await graphQLCommon(CREATE_CAREER_COUNSELING, variables);
    return response;
};

const UPDATE_CAREER_COUNSELING = gql`
    mutation (
        $id: String!
        $careerCounselingInput: CareerCounselingUpdateInput
    ) {
        updateCareerCounseling(
            id: $id
            careerCounselingUpdateInput: $careerCounselingInput
        ) {
            _id
            name
        }
    }
`;

export const updateCareerCounseling = async (
    variables: IUpdateCareerCounseling,
) => {
    const response = await graphQLCommon(UPDATE_CAREER_COUNSELING, variables);
    return response;
};

const DELETE_CAREER_COUNSELING = gql`
    mutation ($id: String!) {
        deleteCareerCounseling(id: $id)
    }
`;

export const deleteCareerCounseling = async (variables: IGetById) => {
    const response = await graphQLCommon(DELETE_CAREER_COUNSELING, variables);
    return response;
};
