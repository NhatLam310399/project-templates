/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql } from "apollo-boost";
import {
    ICreateUserInput,
    IUpdateUserByAdminInput,
    IGetAllUserHasPermissions,
    IDeleteUser,
    IGetAllUser,
    ISetEnableForUser,
    ISetPermissionForUser,
    IMongoObjectId,
    IById,
    IUpdateUserProfile,
    IGetUserByRecruitment
} from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const users = `
_id
displayName
password
company {
    _id
    name
    phoneNumber
    code
    size
    highlight
    isIdentified
    logo {
        default
        medium
        small
    }
    images {
        default
        medium
        small
    }
    videos
    career {
        _id
        name
    }
    location
    benefits {
        icon {
            _id
            name
            icon {
                default
                medium
                small
            }
            description
        }
        content
    }
    description
    contactName
}
urlAvt {
    default
    medium
    small
}
permission
provider
gender
username
identityCard
code
email
phoneNumber
birthday
province {
    _id
    name
    code
}
district {
    name
    _id
    code
    provinceName
}
ward {
    _id
    name
    code
}
street {
    _id
    name
}
enabled
`
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
                ${users}
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
                ${users}
            }
            totalCount
        }
    }
`;
export const getAllUser = async (variable: IGetAllUser) => {
    const result = await graphQLCommon(GET_ALL_USER, variable);
    return result;
};
const CREATE_USER_BY_ADMIN = gql`
    mutation ($createUserInput: CreateUserInput) {
        createUserByAdmin(createUserInput: $createUserInput) {
            _id
            username
        }
    }
`;
export const createUserByAdmin = async (variables: ICreateUserInput) => {
    const result = await graphQLCommon(CREATE_USER_BY_ADMIN, variables);
    return result;
};
const UPDATE_USER_BY_ADMIN = gql`
    mutation ($updateUserInput: UpdateUserInput!, $id: String!) {
        updateUserByAdmin(id: $id, updateUserInput: $updateUserInput) {
            _id
            gender
            urlAvt {
                default
                medium
                small
            }
            displayName
            username
            email
            phoneNumber
            permission
            province {
                _id
                name
            }
            district {
                _id
                name
            }
            enabled
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
        setEnabledUser(id: $id, enabled: $enabled)
    }
`;
export const setEnableForUser = async (variables: ISetEnableForUser) => {
    const result = await graphQLCommon(SET_ENABLE_FOR_USER, variables);
    return result;
};

const SET_PERMISSION_BY_ADMIN = gql`
    mutation ($id: String!, $permission: String!) {
        setPermissionByAdmin(id: $id, permission: $permission)
    }
`;
export const setPermissionByAdmin = async (
    variables: ISetPermissionForUser,
) => {
    const result = await graphQLCommon(SET_PERMISSION_BY_ADMIN, variables);
    return result;
};

const GET_USER_BY_ID = gql`
    query ($id: String!) {
        getUserById(id: $id) {
            ${users}
        }
    }
`;

export const getUserById = async (variables: IById) => {
    const result = await graphQLCommon(GET_USER_BY_ID, variables);
    return result;
};
const UPDATE_USER_PROFILE = gql`
    mutation ($updateUserInput: UpdateUserInput!) {
        updateUserProfile(updateUserInput: $updateUserInput) {
            _id
        }
    }
`;
export const updateUserProfile = async (variable: IUpdateUserProfile) => {
    const result = await graphQLCommon(UPDATE_USER_PROFILE, variable);
    return result;
};
const GET_USERS_BY_RECRUITMENT = gql`
query ($idRecruitment:String,$page:Int,$size:Int) {
    getUserByRecruitment(idRecruitment: $idRecruitment,page:$page,size:$size) {
        results {
            user{
                ${users}
            }
            status
        }
        totalCount
    }
}
`;
export const getUsersByRecruitment = async (variable: IGetUserByRecruitment) => {
    const result = await graphQLCommon(GET_USERS_BY_RECRUITMENT, variable);
    return result;
};
const GET_USERS_STATUS_VIEW_BY_RECRUITMENT = gql`
query ($idRecruitment:String,$page:Int,$size:Int) {
    getUserStatusViewByRecruitment(idRecruitment: $idRecruitment,page:$page,size:$size) {
        results {
            user{
                ${users}
            }
            status
        }
        totalCount
    }
}
`;
export const getUsersStatusViewedByRecruitment = async (variable: IGetUserByRecruitment) => {
    const result = await graphQLCommon(GET_USERS_STATUS_VIEW_BY_RECRUITMENT, variable);
    return result;
};
