import { gql } from "apollo-boost";
import { IById, IGetAllCareStaff } from "common/typings";

import { graphQLCommon } from "common/utils/api";

const GET_ALL_CARE_STAFF = gql`
  query ($page: Int, $size: Int, $filterCareStaff: FilterCareStaff) {
    getAllCareStaff(
      page: $page
      size: $size
      filterCareStaff: $filterCareStaff
    ) {
      totalCount
      results {
        _id
        staff {
          _id
          displayName
          username
          email
          phoneNumber
          province {
            name
          }
          district {
            name
          }
          ward {
            name
          }
          street
        }
        user {
          _id
          displayName
          username
          email
          phoneNumber
          permission
          province {
            name
          }
          district {
            name
          }
          ward {
            name
          }
          street
        }
        company {
          _id
          name
          phoneNumber
          email
          province {
            name
          }
          district {
            name
          }
          ward {
            name
          }
          street
        }
        comment
        enabled
        image {
          default
          small
        }
        rate
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllCareStaff = async (variables: IGetAllCareStaff) => {
  const result = await graphQLCommon(GET_ALL_CARE_STAFF, variables);
  return result;
};

const GET_CARE_STAFF_BY_ID = gql`
  query ($id: String) {
    getCareStaffById(id: $id) {
      _id
      staff {
        _id
        displayName
        username
        email
        phoneNumber
      }
      user {
        _id
        displayName
        username
        email
        phoneNumber
      }
      comment
      enabled
      image {
        default
        small
      }
      rate
    }
  }
`;

export const getCareStaffById = async (variables: IById) => {
  const result = await graphQLCommon(GET_CARE_STAFF_BY_ID, variables);
  return result;
};

const DELETE_CARE_STAFF_BY_ID = gql`
  mutation ($id: String!) {
    deleteCareStaffById(id: $id)
  }
`;

export const deleteCareStaffById = async (variables: IById) => {
  const result = await graphQLCommon(DELETE_CARE_STAFF_BY_ID, variables);
  return result;
};
