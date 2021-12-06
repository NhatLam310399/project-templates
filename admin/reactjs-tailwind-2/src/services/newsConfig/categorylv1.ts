import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
    IGetAllCategoryLevel1,
    ICreateCategoryLevel1Input,
    IUpdateCategoryLevel1Input,
    IDeleteCategoryLevel1,
} from "common/formatTypes";

const GET_ALL_CATEGORY_LEVEL1 = gql`
    query (
        $filterCategoryLevel1: FilterCategoryLevel1
        $page: Int
        $size: Int
    ) {
        getAllCategoryLevel1(
            filterCategoryLevel1: $filterCategoryLevel1
            page: $page
            size: $size
        ) {
            results {
                _id
                name
                description
                keywords
                createdAt
                updatedAt
            }
            totalCount
        }
    }
`;
export const getAllCategoryLevel1 = async (variable: IGetAllCategoryLevel1) => {
    const response = await graphQLCommon(GET_ALL_CATEGORY_LEVEL1, variable);
    return response;
};

const CREATE_CATEGORY_LEVEL1 = gql`
    mutation ($categoryLevel1Input: CategoryLevel1Input!) {
        createCategoryLevel1(categoryLevel1Input: $categoryLevel1Input) {
            name
            description
        }
    }
`;
export const createCategoryLevel1 = async (
    variables: ICreateCategoryLevel1Input,
) => {
    const result = await graphQLCommon(CREATE_CATEGORY_LEVEL1, variables);
    return result;
};

const UPDATE_CATEGORY_LEVEL1 = gql`
    mutation ($id: String!, $categoryLevel1Input: CategoryLevel1Input!) {
        updateCategoryLevel1(
            id: $id
            categoryLevel1Input: $categoryLevel1Input
        ) {
            name
            description
        }
    }
`;
export const updateCategoryLevel1 = async (
    variables: IUpdateCategoryLevel1Input,
) => {
    const result = await graphQLCommon(UPDATE_CATEGORY_LEVEL1, variables);
    return result;
};

const DELETE_CATEGORY_LEVEL1 = gql`
    mutation ($id: String!) {
        deleteCategoryLevel1(id: $id)
    }
`;
export const deleteCategoryLevel1 = async (
    variables: IDeleteCategoryLevel1,
) => {
    const result = await graphQLCommon(DELETE_CATEGORY_LEVEL1, variables);
    return result;
};
