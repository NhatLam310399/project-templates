import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
  ICreateStaticPage,
  IRemoveStaticPages,
  IUpdateStaticPages,
} from "common/typings";

const GET_ALL_PAGES = gql`
  query {
    getAllPages {
      _id
      title
      content
      url
      category {
        _id
        name
      }
      image {
        default
        medium
        small
      }
    }
  }
`;

export const getAllPages = async () => {
  const response = await graphQLCommon(GET_ALL_PAGES, {});
  return response;
};

const CREATE_PAGE = gql`
  mutation ($createPagesInput: CreatePagesInput) {
    createPages(createPagesInput: $createPagesInput) {
      _id
      title
    }
  }
`;
export const createPages = async (variables: ICreateStaticPage) => {
  const response = await graphQLCommon(CREATE_PAGE, variables);

  return response;
};

const UPDATE_PAGE = gql`
  mutation ($fieldsToUpdate: UpdatePagesInput, $id: String) {
    updatePages(fieldsToUpdate: $fieldsToUpdate, id: $id) {
      _id
      title
    }
  }
`;

export const updatePages = async (variable: IUpdateStaticPages) => {
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
