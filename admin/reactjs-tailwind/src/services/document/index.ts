import { gql } from "apollo-boost";
import {
  IById,
  IGetAllBasicDocument,
  IUpdateBasicDocument,
  ICreateBasicDocument,
} from "common/typings";

import { graphQLCommon } from "common/utils/api";

const GET_ALL_BASIC_DOCUMENT = gql`
  query ($page: Int, $size: Int, $filterBasicDocument: FilterBasicDocument) {
    getAllBasicDocument(
      page: $page
      size: $size
      filterBasicDocument: $filterBasicDocument
    ) {
      totalCount
      results {
        _id
        images {
          default
          small
        }
        video
        karaoke {
          _id
          name
          phoneNumber
        }
        name
        introduce
        price
        file
        fileName
        link
        highlight
        keywords
        type {
          name
          code
          value
        }
        slug
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllBasicDocument = async (variables: IGetAllBasicDocument) => {
  const result = await graphQLCommon(GET_ALL_BASIC_DOCUMENT, variables);
  return result;
};

const CREATE_BASIC_DOCUMENT = gql`
  mutation ($basicDocumentCreateInput: BasicDocumentCreateInput!) {
    createBasicDocument(basicDocumentCreateInput: $basicDocumentCreateInput) {
      _id
    }
  }
`;

export const createBasicDocument = async (variables: ICreateBasicDocument) => {
  const response = await graphQLCommon(CREATE_BASIC_DOCUMENT, variables);
  return response;
};

const UPDATE_BASIC_DOCUMENT = gql`
  mutation (
    $id: String!
    $basicDocumentUpdateInput: BasicDocumentUpdateInput!
  ) {
    updateBasicDocument(
      id: $id
      basicDocumentUpdateInput: $basicDocumentUpdateInput
    ) {
      _id
    }
  }
`;

export const updateBasicDocument = async (variables: IUpdateBasicDocument) => {
  const response = await graphQLCommon(UPDATE_BASIC_DOCUMENT, variables);
  return response;
};

const DELETE_BASIC_DOCUMENT = gql`
  mutation ($id: String!) {
    deleteBasicDocument(id: $id)
  }
`;

export const deleteBasicDocument = async (variables: IById) => {
  const response = await graphQLCommon(DELETE_BASIC_DOCUMENT, variables);
  return response;
};
