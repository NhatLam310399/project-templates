import { gql } from "apollo-boost";
import { graphQLCommon } from "@common/utils/api";
import { IGetUser } from "@common/typings";
const user = `
    _id
      code
      title
      history
      identityCard
      province {
        _id
        name
        code
      }
      clientId
      provider
      birthday
      gender
      urlAvt {
        default
        small
        medium
      }
      firstName
      lastName
      displayName
      company {
        name
        code
      }
      username
      email
      phoneNumber
      appliedRecruitment {
        recruitment {
          _id
          slug
          name
          level {
            name
          }
          location {
            province {
              name
            }
          }
          createdAt
        }
        date
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
      street {
        name
        code
        _id
      }
      point
      postedJob
      subscribedCompany {
        name
      }
      seenCompany {
        name
      }
      seenRecruitment {
        name
      }
      savedRecruitment {
        _id
        slug
        name
        level {
          name
        }
        location {
          province {
            name
          }
        }
        createdAt
      }
      slug
      keywords
      language
      enabled
`;
const GET_USER_PROFILE = gql`
  query($id: String!) {
    getUserById(id: $id) {
      ${user}
    }
  }
`;

export const getUserProfile = async (variables: IGetUser) => {
  const response = await graphQLCommon(GET_USER_PROFILE, variables);
  return response;
};

const GET_ALL_USER = gql`
query
  {
    getAllUserHasPermissions(permissions:["ADMIN","EMPLOYER","CANDIDATE","MANAGER"])
    {
      totalCount
      results{
        ${user}
     }
     
    }
  }
`;

export const getAllUser = async () => {
  const response = await graphQLCommon(GET_ALL_USER, null);
  return response;
};

const CHECK_USER_PROFILE_EXIST = gql`
query
  {
    checkProfileUserExist
  }
`;

export const checkProfileUserExist = async () => {
  const response = await graphQLCommon(CHECK_USER_PROFILE_EXIST, null);
  return response;
};
