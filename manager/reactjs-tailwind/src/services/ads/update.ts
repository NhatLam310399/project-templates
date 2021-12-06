/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql } from "apollo-boost";
import { IUpdateAds } from "typings";
import { graphQLCommon } from "common/utils/api";

const UPDATE_ADS = gql`
  mutation ($fieldsToUpdate: UpdateAdsInput!, $id: String) {
    updateAds(fieldsToUpdate: $fieldsToUpdate, id: $id) {
      _id
      name
      code
      urlImage {
        default
        medium
        small
      }
      slideImg {
        default
        medium
        small
      }
      displayLocation {
        name
        code
        value
        slug
        _id
      }
      link
    }
  }
`;
export const updateAds = async (variables: IUpdateAds) => {
  const result = await graphQLCommon(UPDATE_ADS, variables);
  return result;
};
