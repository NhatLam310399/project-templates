import { gql } from "apollo-boost";
import {
  IById,
  IGetAllDocument,
  IUpdateDocument,
  ICreateDocument,
} from "common/typings";

import { graphQLCommon } from "common/utils/api";

const GET_ALL_DOCUMENT = gql`
  query ($page: Int, $size: Int, $filterDocument: FilterDocument) {
    getAllDocument(page: $page, size: $size, filterDocument: $filterDocument) {
      totalCount
      results {
        _id
        images {
          default
          small
        }
        video
        place {
          _id
          name
          phoneNumber
        }
        name
        introduce
        price
        file
        fileName
        type
        keywords
        slug
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllDocument = async (variables: IGetAllDocument) => {
  const result = await graphQLCommon(GET_ALL_DOCUMENT, variables);
  return result;
};

const CREATE_DOCUMENT = gql`
  mutation ($documentCreateInput: DocumentCreateInput!) {
    createDocument(documentCreateInput: $documentCreateInput) {
      _id
    }
  }
`;

export const createDocument = async (variables: ICreateDocument) => {
  const response = await graphQLCommon(CREATE_DOCUMENT, variables);
  return response;
};

const UPDATE_DOCUMENT = gql`
  mutation ($id: String!, $documentUpdateInput: DocumentUpdateInput!) {
    updateDocument(id: $id, documentUpdateInput: $documentUpdateInput) {
      _id
    }
  }
`;

export const updateDocument = async (variables: IUpdateDocument) => {
  const response = await graphQLCommon(UPDATE_DOCUMENT, variables);
  return response;
};

const DELETE_DOCUMENT = gql`
  mutation ($id: String!) {
    deleteDocument(id: $id)
  }
`;

export const deleteDocument = async (variables: IById) => {
  const response = await graphQLCommon(DELETE_DOCUMENT, variables);
  return response;
};
