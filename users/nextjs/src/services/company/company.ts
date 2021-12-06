import { graphQLCommon } from "@common/utils/api";
import { gql } from "apollo-boost";
import {
  IGetAllCompany,
  IGetBySlug,
  IGetCompany,
  ISetSeenCompany,
  ISetSubscribeCompany,
  IUpdateCompany,
} from "@common/typings";

const GET_ALL_COMPANY = gql`
  query(
    $keyword: String
    $filterCompany: FilterCompany
    $page: Int
    $size: Int
  ) {
    getCompanies(
      keyword: $keyword
      filterCompany: $filterCompany
      page: $page
      size: $size
    ) {
      totalCount
      results {
        _id
        name
        code
        slug
        description
        career {
          _id
          name
        }
        size
        phoneNumber
        contactName
        location
        province {
          name
        }
        images {
          default
          medium
          small
        }
        logo {
          small
          medium
          default
        }
        videos
        benefits {
          _id
          icon {
            name
            icon {
              default
              medium
              small
            }
            _id
          }
          content
        }
        subscribe
        user {
          _id
        }
      }
    }
  }
`;

export const getAllCompany = async (variables: IGetAllCompany) => {
  const response = await graphQLCommon(GET_ALL_COMPANY, variables);
  return response;
};

const GET_COMPANY = gql`
  query Query($id: String!) {
    getCompanyById(id: $id) {
      _id
      name
      code
      description
      career {
        _id
        name
      }
      size
      phoneNumber
      contactName
      location
      province {
        name
      }
      images {
        default
        medium
        small
      }
      logo {
        small
        medium
        default
      }
      videos
      benefits {
        _id
        icon {
          name
          icon {
            default
            medium
            small
          }
          _id
        }
        content
      }
      subscribe
      user {
        _id
      }
    }
  }
`;

export const getCompany = async (variables: IGetCompany) => {
  const response = await graphQLCommon(GET_COMPANY, variables);
  return response;
};

const UPDATE_COMPANY = gql`
  mutation($id: String!, $companyUpdateInput: CompanyUpdateInput) {
    updateCompany(id: $id, companyUpdateInput: $companyUpdateInput) {
      _id
    }
  }
`;

export const updateCompany = async (variables: IUpdateCompany) => {
  const response = await graphQLCommon(UPDATE_COMPANY, variables);
  return response;
};

const SUBSCRIBE_COMPANY = gql`
  mutation($userId: String!, $companyId: String!) {
    setSubscribedCompany(userId: $userId, companyId: $companyId)
  }
`;

export const setSubscribeCompany = async (variables: ISetSubscribeCompany) => {
  const response = await graphQLCommon(SUBSCRIBE_COMPANY, variables);
  return response;
};

const GET_COMPANY_BY_SLUG = gql`
  query($slug: String!) {
    getCompanyBySlug(slug: $slug) {
      _id
      name
      code
      description
      career {
        _id
        name
      }
      size
      phoneNumber
      contactName
      location
      province {
        name
      }
      images {
        default
        medium
        small
      }
      logo {
        small
        medium
        default
      }
      videos
      benefits {
        _id
        icon {
          name
          icon {
            default
            medium
            small
          }
          description
          _id
        }
        content
      }
      subscribe
      user {
        _id
      }
    }
  }
`;

export const getCompanyBySlug = async (variables: IGetBySlug) => {
  const response = await graphQLCommon(GET_COMPANY_BY_SLUG, variables);
  return response;
};

const UPDATE_COMPANY_PROVINCE = gql`
  mutation {
    updateCompanyProvince
  }
`;
export const updateCompanyProvince = async (variables: null) => {
  const response = await graphQLCommon(UPDATE_COMPANY_PROVINCE, variables);
  return response;
};

const SET_SEEN_COMPANY = gql`
  mutation SetSeenCompanyMutation($userId: String!, $companyId: String!) {
    setSeenCompany(userId: $userId, companyId: $companyId)
  }
`;

export const setSeenCompany = async (variables: ISetSeenCompany) => {
  const response = await graphQLCommon(SET_SEEN_COMPANY, variables);
  return response;
};
