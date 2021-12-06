import { gql } from "apollo-boost";
import {
  IGetNotificationByUser,
  IGetNotificationSetting,
  ISetSeenForNotify,
} from "@common/typings";
import { graphQLCommon } from "@common/utils/api";

const GET_NOTIFICATION = gql`
  query($userId: String!) {
    getNotifyByUser(userId: $userId) {
      _id
      name
      company {
        _id
        name
      }
      description
      createdAt
      seen
    }
  }
`;
export const getNotificationByUser = async (
  variables: IGetNotificationByUser,
) => {
  const result = await graphQLCommon(GET_NOTIFICATION, variables);
  return result;
};

const SET_SEEN_FOR_NOTIFY = gql`
  mutation($userId: String!) {
    setSeenForNotify(userId: $userId)
  }
`;
export const setSeenForNotify = async (variables: ISetSeenForNotify) => {
  const result = await graphQLCommon(SET_SEEN_FOR_NOTIFY, variables);
  return result;
};
const GET_NOTIFICATION_SETTING = gql`
  query($filterNotifySetting: FilterNotifySetting) {
    getAllNotifySetting(filterNotifySetting: $filterNotifySetting) {
      results {
        _id
        name
        description
        createdAt
        permission
      }
    }
  }
`;
export const getNotificationSetting = async (
  variables: IGetNotificationSetting,
) => {
  const result = await graphQLCommon(GET_NOTIFICATION_SETTING, variables);
  return result;
};
