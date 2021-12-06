import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
    IGetById,
    ICreateBenefit,
    IGetAllBenefit,
    IUpdateBenefit,
} from "common/formatTypes";

const GET_ALL_BENEFIT = gql`
    query ($page: Int, $size: Int) {
        getAllBenefit(page: $page, size: $size) {
            totalCount
            results {
                _id
                icon {
                    default
                    small
                }
                name
                keywords
            }
        }
    }
`;

export const getAllBenefit = async (variables: IGetAllBenefit) => {
    const response = await graphQLCommon(GET_ALL_BENEFIT, variables);
    return response;
};

const CREATE_BENEFIT = gql`
    mutation ($benefitInput: BenefitInput!) {
        createBenefit(benefitInput: $benefitInput) {
            _id
            name
        }
    }
`;

export const createBenefit = async (variables: ICreateBenefit) => {
    const response = await graphQLCommon(CREATE_BENEFIT, variables);
    return response;
};

const UPDATE_BENEFIT = gql`
    mutation ($id: String!, $benefitInput: BenefitInput!) {
        updateBenefit(id: $id, benefitInput: $benefitInput) {
            _id
            name
        }
    }
`;

export const updateBenefit = async (variables: IUpdateBenefit) => {
    const response = await graphQLCommon(UPDATE_BENEFIT, variables);
    return response;
};

const DELETE_BENEFIT = gql`
    mutation ($id: String!) {
        deleteBenefit(id: $id)
    }
`;

export const deleteBenefit = async (variables: IGetById) => {
    const response = await graphQLCommon(DELETE_BENEFIT, variables);
    return response;
};
