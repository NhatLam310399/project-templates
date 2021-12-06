import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
    ICreatePagesInput,
    IRemoveStaticPages,
    IUpdatePagesInput,
    IGetAllPages,
} from "common/formatTypes";

const GET_ALL_PAGES = gql`
    query ($filterPages: FilterPages, $page: Int, $size: Int) {
        getAllPages(filterPages: $filterPages, page: $page, size: $size) {
            totalCount
            results {
                _id
                name
                type {
                    _id
                    name
                }
                content
                url
                image {
                    default
                    medium
                    small
                }
            }
        }
    }
`;

export const getAllPages = async (variables: IGetAllPages) => {
    const result = await graphQLCommon(GET_ALL_PAGES, variables);
    return result;
};

const CREATE_PAGE = gql`
    mutation ($createPagesInput: CreatePagesInput) {
        createPages(createPagesInput: $createPagesInput) {
            _id
        }
    }
`;
export const createPages = async (variables: ICreatePagesInput) => {
    const response = await graphQLCommon(CREATE_PAGE, variables);

    return response;
};

const UPDATE_PAGE = gql`
    mutation ($fieldsToUpdate: UpdatePagesInput, $id: String) {
        updatePages(fieldsToUpdate: $fieldsToUpdate, id: $id) {
            _id
        }
    }
`;

export const updatePages = async (variable: IUpdatePagesInput) => {
    const response = await graphQLCommon(UPDATE_PAGE, variable);
    return response;
};

const REMOVE_PAGE = gql`
    mutation ($id: String!) {
        removePages(id: $id)
    }
`;

export const removePages = async (variable: IRemoveStaticPages) => {
    const response = await graphQLCommon(REMOVE_PAGE, variable);
    return response;
};
