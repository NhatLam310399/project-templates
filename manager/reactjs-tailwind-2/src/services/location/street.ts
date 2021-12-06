import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
  IGetStreet,
  IUpdateStreet,
  ICreateStreet,
  IDeleteStreet,
} from "common/typings";

const GET_STREETS = gql`
  query ($filterStreetType: FilterStreetType, $page: Int = 0, $size: Int) {
    filterStreetType(
      filterStreetType: $filterStreetType
      page: $page
      size: $size
    ) {
      totalCount
      streets {
        _id
        name
        code
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
        country {
          _id
          name
          code
        }
        ward {
          _id
          name
          code
        }
      }
    }
  }
`;

export const getStreets = async (variables: IGetStreet) => {
  const result = await graphQLCommon(GET_STREETS, variables);

  return result;
};

const CREATE_STREET = gql`
  mutation ($input: StreetTypeInput!) {
    createStreet(streetTypeInput: $input) {
      name
      _id
    }
  }
`;
export const createStreet = async (variables: ICreateStreet) => {
  const result = await graphQLCommon(CREATE_STREET, variables);
  return result;
};

const UPDATE_STREET = gql`
  mutation ($id: String!, $input: StreetTypeInput!) {
    updateStreet(id: $id, streetTypeInput: $input) {
      name
      _id
    }
  }
`;
export const updateStreet = async (variables: IUpdateStreet) => {
  const result = await graphQLCommon(UPDATE_STREET, variables);
  return result;
};

const DELETE_STREET = gql`
  mutation ($id: String!) {
    deleteStreet(id: $id)
  }
`;
export const deleteStreet = async (variables: IDeleteStreet) => {
  const result = await graphQLCommon(DELETE_STREET, variables);
  return result;
};
