import { gql } from "apollo-boost";
import {
    IGetById,
    ICreateTag,
    IUpdateTag,
    IGetAllTag,
} from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_TAG = gql`
    query ($filterTag: FilterTag, $page: Int, $size: Int) {
        getAllTag(filterTag: $filterTag, page: $page, size: $size) {
            totalCount
            results {
                _id
                keywords
                name
                description
                createdAt
                isHot
            }
        }
    }
`;

export const getAllTag = async (variables: IGetAllTag) => {
    const response = await graphQLCommon(GET_ALL_TAG, variables);
    return response;
};

const CREATE_TAG = gql`
    mutation ($tagInput: TagInput!) {
        createTag(tagInput: $tagInput) {
            _id
            name
        }
    }
`;

export const createTag = async (variables: ICreateTag) => {
    const response = await graphQLCommon(CREATE_TAG, variables);
    return response;
};

const UPDATE_TAG = gql`
    mutation ($id: String!, $tagInput: TagInput!) {
        updateTag(id: $id, tagInput: $tagInput) {
            _id
            name
        }
    }
`;

export const updateTag = async (variables: IUpdateTag) => {
    const response = await graphQLCommon(UPDATE_TAG, variables);
    return response;
};

const DELETE_TAG = gql`
    mutation ($id: String!) {
        deleteTag(id: $id)
    }
`;

export const deleteTag = async (variables: IGetById) => {
    const response = await graphQLCommon(DELETE_TAG, variables);
    return response;
};
