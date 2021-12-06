/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql } from "apollo-boost";
import {
  ICreateUserByAdmin,
  IUpdateUserByAdminInput,
  IGetAllUserHasPermissions,
  IDeleteUser,
  IGetAllUser,
  ISetEnableForUser,
  ISetPerMissionForUser,
  IById,
  ISetIsHighlightForUser,
} from "common/typings";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_USER_HAS_PERMISSIONS = gql`
  query (
    $permissions: [String]!
    $page: Int
    $size: Int
    $filterUser: FilterUser
  ) {
    getAllUserHasPermissions(
      permissions: $permissions
      page: $page
      size: $size
      filterUser: $filterUser
    ) {
      results {
        _id
        displayName
        highlight
        urlAvt {
          default
          medium
          small
        }
        username
        email
        phoneNumber
        province {
          _id
          name
          code
        }
        district {
          name
          _id
          code
        }
        ward {
          name
          _id
          code
        }
        street
        enabled
        permission
        gender
        birthday
        createdAt
      }
      totalCount
    }
  }
`;
export const getAllUserHasPermissions = async (
  variables: IGetAllUserHasPermissions,
) => {
  const result = await graphQLCommon(GET_ALL_USER_HAS_PERMISSIONS, variables);
  return result;
};
const GET_ALL_USER = gql`
  query ($filterUser: FilterUser, $page: Int, $size: Int) {
    getAllUsers(filterUser: $filterUser, page: $page, size: $size) {
      results {
        _id
        displayName
        highlight
        urlAvt {
          default
          small
          medium
        }
        username
        email
        phoneNumber
        province {
          _id
          name
        }
        district {
          name
          _id
        }
        ward {
          name
          _id
        }
        enabled
        permission
        gender
        createdAt
      }
      totalCount
    }
  }
`;
export const getAllUser = async (variables: IGetAllUser) => {
  const result = await graphQLCommon(GET_ALL_USER, variables);
  return result;
};
const CREATE_USER_BY_ADMIN = gql`
  mutation ($createUserInput: CreateUserInput) {
    createUserByAdmin(createUserInput: $createUserInput) {
      _id
    }
  }
`;

const GET_USER_BY_ID = gql`
  query ($id: String!) {
    getUserById(id: $id) {
      _id
      displayName
      highlight
      urlAvt {
        default
        small
        medium
      }
      username
      email
      phoneNumber
      province {
        _id
        code
        name
      }
      district {
        name
        code
        _id
      }
      ward {
        name
        code
        _id
      }
      street
      enabled
      permission
      gender
      birthday
      createdAt
    }
  }
`;

export const getUserById = async (variables: IById) => {
  const result = await graphQLCommon(GET_USER_BY_ID, variables);
  return result;
};

export const createUserByAdmin = async (variables: ICreateUserByAdmin) => {
  const result = await graphQLCommon(CREATE_USER_BY_ADMIN, variables);
  return result;
};
const UPDATE_USER_BY_ADMIN = gql`
  mutation ($updateUserInput: UpdateUserInput!, $id: String!) {
    updateUserByAdmin(id: $id, updateUserInput: $updateUserInput) {
      _id
    }
  }
`;

export const updateUserByAdmin = async (variables: IUpdateUserByAdminInput) => {
  const result = await graphQLCommon(UPDATE_USER_BY_ADMIN, variables);
  return result;
};
const DELETE_USER = gql`
  mutation ($id: String!) {
    deleteUser(id: $id)
  }
`;

export const deleteUserById = async (variables: IDeleteUser) => {
  const result = await graphQLCommon(DELETE_USER, variables);
  return result;
};

const SET_ENABLE_FOR_USER = gql`
  mutation ($id: String!, $enabled: Boolean!) {
    setEnabledForUser(id: $id, enabled: $enabled)
  }
`;
export const setEnableForUser = async (variables: ISetEnableForUser) => {
  const result = await graphQLCommon(SET_ENABLE_FOR_USER, variables);

  return result;
};

const SET_PERMISSION_FOR_USER = gql`
  mutation ($id: String!, $permission: String!) {
    setPermissionForUser(id: $id, permission: $permission)
  }
`;
export const setPermissionForUser = async (
  variables: ISetPerMissionForUser,
) => {
  const result = await graphQLCommon(SET_PERMISSION_FOR_USER, variables);
  return result;
};

const SET_IS_HIGHLIGHT_FOR_USER = gql`
  mutation ($id: String!, $isHighlight: Boolean) {
    setHighlightUser(id: $id, isHighlight: $isHighlight)
  }
`;
export const setIsHighlightForUser = async (
  variables: ISetIsHighlightForUser,
) => {
  const result = await graphQLCommon(SET_IS_HIGHLIGHT_FOR_USER, variables);
  return result;
};
