import { gql } from "apollo-boost";
import {
    IGetById,
    ICreateCategory,
    IUpdateCategory,
    IGetAllCategory,
} from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_CATEGORY = gql`
    query ($filterCategory: FilterCategory, $page: Int, $size: Int) {
        getAllCategory(
            filterCategory: $filterCategory
            page: $page
            size: $size
        ) {
            totalCount
            results {
                _id
                name
                description
                createdAt
            }
        }
    }
`;

export const getAllCategory = async (variables: IGetAllCategory) => {
    const response = await graphQLCommon(GET_ALL_CATEGORY, variables);
    return response;
};

const CREATE_CATEGORY = gql`
    mutation ($categoryInput: CategoryInput!) {
        createCategory(categoryInput: $categoryInput) {
            _id
            name
        }
    }
`;

export const createCategory = async (variables: ICreateCategory) => {
    const response = await graphQLCommon(CREATE_CATEGORY, variables);
    return response;
};

const UPDATE_CATEGORY = gql`
    mutation ($id: String!, $categoryInput: CategoryInput!) {
        updateCategory(id: $id, categoryInput: $categoryInput) {
            _id
            name
        }
    }
`;

export const updateCategory = async (variables: IUpdateCategory) => {
    const response = await graphQLCommon(UPDATE_CATEGORY, variables);
    return response;
};

const DELETE_CATEGORY = gql`
    mutation ($id: String!) {
        deleteCategory(id: $id)
    }
`;

export const deleteCategory = async (variables: IGetById) => {
    const response = await graphQLCommon(DELETE_CATEGORY, variables);
    return response;
};
