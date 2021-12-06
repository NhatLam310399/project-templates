import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";
import {
  ICreateRecruitment,
  IGetAllRecruitment,
  IGetBestRecruitment,
  IGetById,
  IGetBySlug,
  IGetRecruitmentByCompany,
  IGetRecruitmentByUser,
  IRemoveSavedRecruitment,
  ISetAppliedRecruitment,
  ISetSeenRecruitment,
} from "@common/typings";
const recruitment = `
        _id 
        name
        type {
          name
        }
        level {
          name
        }
        view
        description
        requirement
        career {
          name
        }
        location {
          name
          province {
            name
          }
          location
        }
        highlight
        user {
          _id
          displayName
          username
          email
          phoneNumber
        }
        viewedUser {
          _id
          displayName
          username
          email
          phoneNumber
        }
        appliedUser {
          _id
          displayName
          username
          email
          phoneNumber
        }
        salaryMin
        salaryMax
        dealSalary
        isApproved
        slug
        keywords {
          name
        }
        expiredDate
        createdAt
        updatedAt
        companyName
        companySize
        companySlug
        companyLocation
        companyBenefit {
          icon {
            icon {
              default
              medium
              small
            }
            name
          }
          content
        }
        companyDescription
        companyLogo {
          default
          medium
          small
        }
        companyImages {
          default
          medium
          small
        }
        companyVideo
        company {
          slug
          name
          logo{
            default
            medium
            small
          }
        }
`;
const GET_ALL_RECRUITMENT = gql`
  query(
    $keyword: String
    $filterRecruitment: FilterRecruitment
    $page: Int
    $size: Int
  ) {
    getAllRecruitment(
      keyword: $keyword
      filterRecruitment: $filterRecruitment
      page: $page
      size: $size
    ) {
      totalCount
      results {
        ${recruitment}
      }
    }
  }
`;

export const getAllRecruitment = async (variables: IGetAllRecruitment) => {
  const response = await graphQLCommon(GET_ALL_RECRUITMENT, variables);
  return response;
};

const GET_RECRUITMENT_BY_COMPANY = gql`
  query($companyId: String!) {
    getRecruitmentByCompany(companyId: $companyId) {
      totalCount
      results {
        ${recruitment}
      }
    }
  }
`;

export const getRecruitmentByCompany = async (
  variables: IGetRecruitmentByCompany,
) => {
  const response = await graphQLCommon(GET_RECRUITMENT_BY_COMPANY, variables);
  return response;
};

const GET_RECRUITMENT_BY_USER = gql`
  query($userId: String!) {
    getRecruitmentByUser(userId: $userId) {
      totalCount
      results {
        ${recruitment}
      }
    }
  }
`;

export const getRecruitmentByUser = async (
  variables: IGetRecruitmentByUser,
) => {
  const response = await graphQLCommon(GET_RECRUITMENT_BY_USER, variables);
  return response;
};

const GET_RECRUITMENT_BY_ID = gql`
  query($id: String!) {
    getRecruitmentById(id: $id) {
      ${recruitment}
    }
  }
`;

export const getRecruitmentById = async (variables: IGetById) => {
  const response = await graphQLCommon(GET_RECRUITMENT_BY_ID, variables);
  return response;
};

const GET_RECRUITMENT_BY_SLUG = gql`
  query($slug: String!) {
    getRecruitmentBySlug(slug: $slug) {
      ${recruitment}
    }
  }
`;
export const getRecruitmentBySlug = async (variables: IGetBySlug) => {
  const response = await graphQLCommon(GET_RECRUITMENT_BY_SLUG, variables);
  return response;
};

const SET_SEEN_RECRUITMENT = gql`
  mutation($userId: String!, $recruitmentId: String!) {
    setSeenRecruitment(userId: $userId, recruitmentId: $recruitmentId)
  }
`;

export const setSeenRecruitment = async (variables: ISetSeenRecruitment) => {
  const response = await graphQLCommon(SET_SEEN_RECRUITMENT, variables);
  return response;
};

const SET_APPLIED_RECRUITMENT = gql`
  mutation($userId: String!, $recruitmentId: String!) {
    setAppliedRecruitment(userId: $userId, recruitmentId: $recruitmentId)
  }
`;

export const setAppliedRecruitment = async (
  variables: ISetAppliedRecruitment,
) => {
  const response = await graphQLCommon(SET_APPLIED_RECRUITMENT, variables);
  return response;
};

const SET_SAVED_RECRUITMENT = gql`
  mutation($userId: String!, $recruitmentId: String!) {
    setSavedRecruitment(userId: $userId, recruitmentId: $recruitmentId)
  }
`;

export const setSavedRecruitment = async (
  variables: ISetAppliedRecruitment,
) => {
  const response = await graphQLCommon(SET_SAVED_RECRUITMENT, variables);
  return response;
};

const CREATE_RECRUITMENT = gql`
  mutation($recruitmentCreateInput: RecruitmentCreateInput!) {
    createRecruitment(recruitmentCreateInput: $recruitmentCreateInput) {
      _id
      name
    }
  }
`;

export const createRecruitment = async (variables: ICreateRecruitment) => {
  const response = await graphQLCommon(CREATE_RECRUITMENT, variables);
  return response;
};

const GET_BEST_RECRUITMENT = gql`
  query Query($size: Int, $page: Int) {
    getBestRecruitment(size: $size, page: $page) {
      totalCount
      results {
        ${recruitment}
      }
    }
  }
`;

export const getBestRecruitment = async (variables: IGetBestRecruitment) => {
  const response = await graphQLCommon(GET_BEST_RECRUITMENT, variables);
  return response;
};

const REMOVE_SAVED_RECRUITMENT = gql`
  mutation($userId: String!, $recruitmentId: String!) {
    removeSavedRecruitmentUser(userId: $userId, recruitmentId: $recruitmentId)
  }
`;
export const removeSavedRecruitment = async (
  variables: IRemoveSavedRecruitment,
) => {
  const response = await graphQLCommon(REMOVE_SAVED_RECRUITMENT, variables);
  return response;
};
