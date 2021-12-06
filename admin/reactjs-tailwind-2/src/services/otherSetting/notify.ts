import { gql } from "apollo-boost";
import {
    IGetById,
    ICreateNotifySetting,
    IUpdateNotifySetting,
    IGetAllNotifySetting,
} from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_NOTIFY_SETTING = gql`
    query ($filterNotifySetting: FilterNotifySetting, $page: Int, $size: Int) {
        getAllNotifySetting(
            filterNotifySetting: $filterNotifySetting
            page: $page
            size: $size
        ) {
            totalCount
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

export const getAllNotifySetting = async (variables: IGetAllNotifySetting) => {
    const response = await graphQLCommon(GET_ALL_NOTIFY_SETTING, variables);
    return response;
};

const CREATE_NOTIFY_SETTING = gql`
    mutation ($notifySettingInput: NotifySettingInput!) {
        createNotifySetting(notifySettingInput: $notifySettingInput) {
            _id
            name
        }
    }
`;

export const createNotifySetting = async (variables: ICreateNotifySetting) => {
    const response = await graphQLCommon(CREATE_NOTIFY_SETTING, variables);
    return response;
};

const UPDATE_NOTIFY_SETTING = gql`
    mutation ($id: String!, $notifySettingInput: NotifySettingInput!) {
        updateNotifySetting(id: $id, notifySettingInput: $notifySettingInput) {
            _id
            name
        }
    }
`;

export const updateNotifySetting = async (variables: IUpdateNotifySetting) => {
    const response = await graphQLCommon(UPDATE_NOTIFY_SETTING, variables);
    return response;
};

const DELETE_NOTIFY_SETTING = gql`
    mutation ($id: String!) {
        deleteNotifySetting(id: $id)
    }
`;

export const deleteNotifySetting = async (variables: IGetById) => {
    const response = await graphQLCommon(DELETE_NOTIFY_SETTING, variables);
    return response;
};
