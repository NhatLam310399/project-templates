import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
  IById,
  ICreateKaraoke,
  IGetAllKaraoke,
  IUpdateKaraoke,
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
    default
    small
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
`;

const GET_ALL_KARAOKE = gql`
  query ($filterPlace: FilterPlace, $page: Int, $size: Int) {
    getAllKaraoke(filterPlace: $filterPlace, page: $page, size: $size) {
      totalCount
      results {
        ${Place}
      }
    }
  }
`;

export const getAllKaraoke = async (variables: IGetAllKaraoke) => {
  const response = await graphQLCommon(GET_ALL_KARAOKE, variables);
  return response;
};

const GET_ALL_KARAOKE_HIGHLIGHT = gql`
  query ($filterPlace: FilterPlace, $page: Int, $size: Int) {
    getAllKaraokeHighlight(
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

export const getAllKaraokeHighlight = async (variables: IGetAllKaraoke) => {
  const response = await graphQLCommon(GET_ALL_KARAOKE_HIGHLIGHT, variables);
  return response;
};

const GET_KARAOKE_BY_ID = gql`
  query ($id: String) {
    getKaraokeById(id: $id) {
      ${Place}
    }
  }
`;

export const getKaraokeById = async (variables: IById) => {
  const response = await graphQLCommon(GET_KARAOKE_BY_ID, variables);
  return response;
};

const CREATE_KARAOKE = gql`
  mutation ($placeCreateInput: PlaceCreateInput!) {
    createKaraoke(placeCreateInput: $placeCreateInput) {
      _id
      name
    }
  }
`;

export const createKaraoke = async (variables: ICreateKaraoke) => {
  const response = await graphQLCommon(CREATE_KARAOKE, variables);
  return response;
};

const UPDATE_KARAOKE = gql`
  mutation ($id: String!, $placeUpdateInput: PlaceUpdateInput!) {
    updateKaraoke(id: $id, placeUpdateInput: $placeUpdateInput) {
      _id
      name
    }
  }
`;

export const updateKaraoke = async (variables: IUpdateKaraoke) => {
  const response = await graphQLCommon(UPDATE_KARAOKE, variables);
  return response;
};

const DELETE_KARAOKE_BY_ID = gql`
  mutation ($id: String!) {
    deleteKaraokeById(id: $id)
  }
`;

export const deleteKaraokeById = async (variables: IById) => {
  const response = await graphQLCommon(DELETE_KARAOKE_BY_ID, variables);
  return response;
};

const DELETE_ALL_KARAOKE = gql`
  mutation {
    deleteAllKaraoke
  }
`;

export const deleteAllKaraoke = async () => {
  const response = await graphQLCommon(DELETE_ALL_KARAOKE, {});
  return response;
};

const CHANGE_COMPANY_TO_KARAOKE = gql`
  mutation ($id: String!) {
    changeCompanytoKaraoke(id: $id) {
      _id
    }
  }
`;

export const changeCompanyToKaraoke = async (variables: IById) => {
  const response = await graphQLCommon(CHANGE_COMPANY_TO_KARAOKE, variables);
  return response;
};

const CHANGE_KARAOKE_TO_COMPANY = gql`
  mutation ($id: String!) {
    changeKaraoketoCompany(id: $id) {
      _id
    }
  }
`;

export const changeKaraokeToCompany = async (variables: IById) => {
  const response = await graphQLCommon(CHANGE_KARAOKE_TO_COMPANY, variables);
  return response;
};
