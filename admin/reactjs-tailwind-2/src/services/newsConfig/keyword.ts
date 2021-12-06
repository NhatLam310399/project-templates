import { gql } from "apollo-boost";
import {
    IGetAllKeyword,
    IUpdateKeyword,
    ICreateKeyword,
    IDeleteKeyword,
} from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_KEYWORD = gql`
    query ($filterKeyword: FilterKeyword, $page: Int, $size: Int) {
        getAllKeyword(filterKeyword: $filterKeyword, page: $page, size: $size) {
            totalCount
            results {
                _id
                name
                description
                keywords
                isHot
                createdAt
            }
        }
    }
`;

export const getAllKeyWord = async (variables: IGetAllKeyword) => {
    const response = await graphQLCommon(GET_ALL_KEYWORD, variables);
    return response;
};

const UPDATE_KEYWORD = gql`
    mutation ($id: String!, $keywordInput: KeywordInput!) {
        updateKeyword(id: $id, keywordInput: $keywordInput) {
            _id
        }
    }
`;

export const updateKeyword = async (variables: IUpdateKeyword) => {
    const response = await graphQLCommon(UPDATE_KEYWORD, variables);
    return response;
};

const CREATE_KEYWORD = gql`
    mutation ($keywordInput: KeywordInput!) {
        createKeyword(keywordInput: $keywordInput) {
            _id
        }
    }
`;

export const createKeyword = async (variables: ICreateKeyword) => {
    const response = await graphQLCommon(CREATE_KEYWORD, variables);
    return response;
};

const DELETE_KEYWORD = gql`
    mutation ($id: String!) {
        deleteKeyword(id: $id)
    }
`;

export const deleteKeyword = async (variables: IDeleteKeyword) => {
    const response = await graphQLCommon(DELETE_KEYWORD, variables);
    return response;
};
