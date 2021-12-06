import { gql } from "apollo-boost";
import {
  IById,
  ICreateNotification,
  IGetAllNotification,
  IUpdateNotification,
} from "common/typings";

import { graphQLCommon } from "common/utils/api";

const GET_ALL_NOTIFICATION = gql`
  query ($page: Int, $size: Int, $filterNotification: FilterNotification) {
    getAllNotification(
      page: $page
      size: $size
      filterNotification: $filterNotification
    ) {
      totalCount
      results {
        _id
        permission
        user {
          _id
          phoneNumber
          displayName
        }
        place {
          _id
          name
        }
        content
        title
        slug
        keywords
        seen
        idBooking
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllNotification = async (variables: IGetAllNotification) => {
  const result = await graphQLCommon(GET_ALL_NOTIFICATION, variables);
  return result;
};

const CREATE_NOTIFICATION = gql`
  mutation ($notificationCreateInput: NotificationCreateInput!) {
    createNotification(notificationCreateInput: $notificationCreateInput) {
      _id
    }
  }
`;

export const createNotification = async (variables: ICreateNotification) => {
  const response = await graphQLCommon(CREATE_NOTIFICATION, variables);
  return response;
};

const UPDATE_NOTIFICATION = gql`
  mutation ($id: String!, $notificationUpdateInput: NotificationUpdateInput!) {
    updateNotification(
      id: $id
      notificationUpdateInput: $notificationUpdateInput
    ) {
      _id
    }
  }
`;

export const updateNotification = async (variables: IUpdateNotification) => {
  const response = await graphQLCommon(UPDATE_NOTIFICATION, variables);
  return response;
};

const DELETE_NOTIFICATION_BY_ID = gql`
  mutation ($id: String!) {
    deleteNotificationById(id: $id)
  }
`;

export const deleteNotificationById = async (variables: IById) => {
  const response = await graphQLCommon(DELETE_NOTIFICATION_BY_ID, variables);
  return response;
};
