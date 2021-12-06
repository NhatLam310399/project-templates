import { gql } from "apollo-boost";
import { graphQLCommon } from "@common/utils/api";

const GET_PROVINCES = gql`
  query {
    getProvinces(name: "", page: 0, size: 999) {
      totalCount
      provinces {
        _id
        name
        code
        slug
        longitude
        latitude
      }
    }
  }
`;

export const getProvinces = async () => {
  const response = await graphQLCommon(GET_PROVINCES, {});
  return response;
};
