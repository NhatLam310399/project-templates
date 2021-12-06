/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";

import {
    ICreateCategoryLv2,
    IDeleteCategoryLv2ById,
    IGetCategoryLv2,
    IGraphQLResponse,
    IUpdateCategoryLv2,
} from "common/formatTypes";

const GET_ALL_CATEGORY_LEVEL_2 = gql`
    query (
        $filterCategoryLevel2: FilterCategoryLevel2
        $page: Int
        $size: Int
    ) {
        getAllCategoryLevel2(
            filterCategoryLevel2: $filterCategoryLevel2
            page: $page
            size: $size
        ) {
            results {
                _id
                icon {
                    default
                    medium
                    small
                }
                name
                categoryLevel1 {
                    _id
                    name
                }
                description
                keywords
                createdAt
                updatedAt
            }
            totalCount
        }
    }
`;

export const getAllCategoryLevel2 = async (variables: IGetCategoryLv2) => {
    const response = await graphQLCommon(GET_ALL_CATEGORY_LEVEL_2, variables);
    return response;
};

const DELETE_CATEGORY_LEVEL_2_BY_ID = gql`
    mutation Mutation($id: String!) {
        deleteCategoryLevel2(id: $id)
    }
`;

export const deleteCategoryLevel2 = async (
    variables: IDeleteCategoryLv2ById,
) => {
    const response = await graphQLCommon(
        DELETE_CATEGORY_LEVEL_2_BY_ID,
        variables,
    );
    return response;
};

const UPDATE_CATEGORY_LEVEL_2 = gql`
    mutation Mutation(
        $id: String!
        $categoryLevel2Input: CategoryLevel2Input!
    ) {
        updateCategoryLevel2(
            id: $id
            categoryLevel2Input: $categoryLevel2Input
        ) {
            _id
            name
        }
    }
`;

export const updateCategoryLevel2 = async (variables: IUpdateCategoryLv2) => {
    const response = await graphQLCommon(UPDATE_CATEGORY_LEVEL_2, variables);
    return response;
};

const CREATE_CATEGORY_LEVEL_2 = gql`
    mutation Mutation($categoryLevel2Input: CategoryLevel2Input!) {
        createCategoryLevel2(categoryLevel2Input: $categoryLevel2Input) {
            _id
            name
        }
    }
`;

export const createCategoryLevel2 = async (variables: ICreateCategoryLv2) => {
    const response: any = await graphQLCommon(
        CREATE_CATEGORY_LEVEL_2,
        variables,
    );
    return response;
};
