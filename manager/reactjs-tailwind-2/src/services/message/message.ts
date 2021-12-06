import { gql } from "apollo-boost";
import { IById } from "common/typings";
import {
  ICreateMessage,
  IGetAllMessage,
  IUpdateMessage,
} from "common/typings/Message";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_MESSAGE = gql`
  query ($filterMessage: FilterMessage, $page: Int, $size: Int) {
    getAllMessage(filterMessage: $filterMessage, page: $page, size: $size) {
      totalCount
      results {
        _id
        userReceived {
          _id
          displayName
          username
          phoneNumber
          email
          urlAvt {
            small
            default
          }
        }
        userSend {
          _id
          displayName
          username
          phoneNumber
          email
          urlAvt {
            small
            default
          }
        }
        content
        time
        slug
        keywords
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllMessage = async (variables: IGetAllMessage) => {
  const result = await graphQLCommon(GET_ALL_MESSAGE, variables);
  return result;
};

const CREATE_MESSAGE = gql`
  mutation ($messageCreateInput: MessageCreateInput!) {
    createMessage(messageCreateInput: $messageCreateInput) {
      _id
      content
    }
  }
`;

export const createMessage = async (variables: ICreateMessage) => {
  const result = await graphQLCommon(CREATE_MESSAGE, variables);
  return result;
};

const UPDATE_ROOM = gql`
  mutation ($id: String!, $messageUpdateInput: MessageUpdateInput!) {
    updateMessage(id: $id, messageUpdateInput: $messageUpdateInput) {
      _id
      content
    }
  }
`;

export const updateMessage = async (variables: IUpdateMessage) => {
  const result = await graphQLCommon(UPDATE_ROOM, variables);
  return result;
};

const DELETE_MESSAGE_BY_ID = gql`
  mutation ($id: String!) {
    deleteMessageById(id: $id)
  }
`;
export const deleteMessageById = async (variables: IById) => {
  const result = await graphQLCommon(DELETE_MESSAGE_BY_ID, variables);
  return result;
};
