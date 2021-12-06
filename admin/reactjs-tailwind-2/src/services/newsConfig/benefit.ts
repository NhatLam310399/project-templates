import { gql } from "apollo-boost";
import {
    ICreateBenefit,
    IDeleteBenefit,
    IGetAllBenefit,
    IUpdateBenefit,
} from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_BENEFIT = gql`
    query ($filterBenefit: FilterBenefit, $page: Int, $size: Int) {
        getAllBenefit(filterBenefit: $filterBenefit, page: $page, size: $size) {
            results {
                _id
                icon {
                    default
                    small
                    medium
                }
                name
                description
            }
            totalCount
        }
    }
`;

export const getAllBenefit = async (variables: IGetAllBenefit) => {
    const response = await graphQLCommon(GET_ALL_BENEFIT, variables);
    return response;
};

const UPDATE_BENEFIT = gql`
    mutation ($id: String!, $benefitInput: BenefitInput!) {
        updateBenefit(id: $id, benefitInput: $benefitInput) {
            name
            description
        }
    }
`;

export const updateBenefit = async (variables: IUpdateBenefit) => {
    const response = await graphQLCommon(UPDATE_BENEFIT, variables);
    return response;
};

const CREATE_BENEFIT = gql`
    mutation ($benefitInput: BenefitInput!) {
        createBenefit(benefitInput: $benefitInput) {
            _id
        }
    }
`;

export const createBenefit = async (variables: ICreateBenefit) => {
    const response = await graphQLCommon(CREATE_BENEFIT, variables);
    return response;
};

const DELETE_BENEFIT = gql`
    mutation ($id: String!) {
        deleteBenefit(id: $id)
    }
`;

export const deleteBenefit = async (variables: IDeleteBenefit) => {
    const response = await graphQLCommon(DELETE_BENEFIT, variables);
    return response;
};
