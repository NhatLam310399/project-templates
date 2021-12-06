import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
  IById,
  ICreateCompany,
  IGetAllCompany,
  IGetAllCompanyHighlight,
  ISetPlaceHighlight,
  IUpdateCompany,
} from "common/typings";

const Place = `
    _id
    name
    phoneNumber
    email
    province {
      _id
      name
      code
    }
    district {
      _id
      name
      code
    }
    ward {
      _id
      name
      code
    }
    street
    introduce
    logo {
      small
      default
    }
    images {
      small
      default
    }
    licenseImages {
      small
      default
    }
    user {
      _id
      username
      displayName
      email
      phoneNumber
    }
    amountRoom
    price
    highlight
    description
    enabled
    status
    createdAt
    location {
      coordinates
    }
`;

const GET_ALL_COMPANY = gql`
  query ($filterPlace: FilterPlace, $page: Int, $size: Int) {
    getAllCompany(filterPlace: $filterPlace, page: $page, size: $size) {
      totalCount
      results {
        ${Place}
      }
    }
  }
`;

export const getAllCompany = async (variables: IGetAllCompany) => {
  const response = await graphQLCommon(GET_ALL_COMPANY, variables);
  return response;
};

const GET_ALL_COMPANY_HIGHLIGHT = gql`
  query ($filterPlace: FilterPlace, $page: Int, $size: Int) {
    getAllCompanyHighlight(
      filterPlace: $filterPlace
      page: $page
      size: $size
    ) {
      totalCount
      results {
        ${Place}
      }
    }
  }
`;

const GET_COMPANY_BY_ID = gql`
  query ($id: String) {
    getCompanyById(id: $id) {
      ${Place}
    }
  }
`;

export const getCompanyById = async (variables: IById) => {
  const response = await graphQLCommon(GET_COMPANY_BY_ID, variables);
  return response;
};

export const getAllCompanyHighlight = async (
  variables: IGetAllCompanyHighlight,
) => {
  const response = await graphQLCommon(GET_ALL_COMPANY_HIGHLIGHT, variables);
  return response;
};

const CREATE_COMPANY = gql`
  mutation ($placeCreateInput: PlaceCreateInput!) {
    createCompany(placeCreateInput: $placeCreateInput) {
      _id
      name
    }
  }
`;

export const createCompany = async (variables: ICreateCompany) => {
  const response = await graphQLCommon(CREATE_COMPANY, variables);
  return response;
};

const UPDATE_COMPANY = gql`
  mutation ($id: String!, $placeUpdateInput: PlaceUpdateInput!) {
    updateCompany(id: $id, placeUpdateInput: $placeUpdateInput) {
      _id
      name
    }
  }
`;

export const updateCompany = async (variables: IUpdateCompany) => {
  const response = await graphQLCommon(UPDATE_COMPANY, variables);
  return response;
};

const DELETE_COMPANY_BY_ID = gql`
  mutation ($id: String!) {
    deleteCompanyById(id: $id)
  }
`;

export const deleteCompanyById = async (variables: IById) => {
  const response = await graphQLCommon(DELETE_COMPANY_BY_ID, variables);
  return response;
};

const DELETE_ALL_COMPANY = gql`
  mutation {
    deleteAllCompany
  }
`;

export const deleteAllCompany = async () => {
  const response = await graphQLCommon(DELETE_ALL_COMPANY, {});
  return response;
};

// setPlaceHight apply for both company and karaoke

const SET_PLACE_HIGHLIGHT = gql`
  mutation ($id: String, $isHighlight: Boolean) {
    setPlaceHighlight(id: $id, isHighlight: $isHighlight)
  }
`;

export const setPlaceHighlight = async (variables: ISetPlaceHighlight) => {
  const response = await graphQLCommon(SET_PLACE_HIGHLIGHT, variables);
  return response;
};
