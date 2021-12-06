import { gql } from "apollo-boost";
import { ICreateAds } from "typings";
import { graphQLCommon } from "common/utils/api";

const CREATE_ADS = gql`
  mutation ($createAdsInput: CreateAdsInput) {
    createAds(createAdsInput: $createAdsInput) {
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
export const createAds = async (variables: ICreateAds) => {
  const result = await graphQLCommon(CREATE_ADS, variables);
  return result;
};
