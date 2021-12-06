import { gql } from "apollo-boost";
import { IGetAllRequest, IGetRequestById } from "common/typings";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_REQUEST = gql`
  query ($filterRequest: FilterPlace, $page: Int, $size: Int) {
    getAllRequestAccept(
      filterRequest: $filterRequest
      page: $page
      size: $size
    ) {
      results {
        _id
        name
        phoneNumber
        logo {
          default
          small
        }
        status
        enabled
        province {
          _id
          code
          name
        }
        district {
          _id
          code
          name
        }
        ward {
          _id
          code
          name
        }
        street
        type
      }
      totalCount
    }
  }
`;

export const getAllRequest = async (variables: IGetAllRequest) => {
  const response = await graphQLCommon(GET_ALL_REQUEST, variables);
  return response;
};

const GET_REQUEST_BY_ID = gql`
  query ($id: String) {
    getRequestById(id: $id) {
      _id
      name
      phoneNumber
      location {
        coordinates
      }
      email
      introduce
      type
      logo {
        default
        small
      }
      status
      enabled
      licenseImages {
        default
        small
      }
      province {
        _id
        code
        name
      }
      district {
        _id
        code
        name
      }
      ward {
        _id
        code
        name
      }
      street
    }
  }
`;

export const getRequestById = async (variables: IGetRequestById) => {
  const response = await graphQLCommon(GET_REQUEST_BY_ID, variables);
  return response;
};
