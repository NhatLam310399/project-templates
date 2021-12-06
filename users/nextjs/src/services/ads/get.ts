/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql } from "apollo-boost";
import { IGetAdsAll, IGetAdsByLocation } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";

const GET_ADS_ALL = gql`
  query($filterAds: FilterAds) {
    getAdsAll(filterAds: $filterAds) {
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
export const getAdsAll = async (variables: IGetAdsAll) => {
  const result = await graphQLCommon(GET_ADS_ALL, variables);
  return result;
};

const GET_ADS_BY_LOCATION = gql`
  query Query($displayLocation: String!) {
    getAdsAllByLocation(displayLocation: $displayLocation) {
      _id
      name
      link
      code
      urlImage {
        default
        medium
        small
      }
    }
  }
`;

export const getAdsByLocation = async (variables: IGetAdsByLocation) => {
  const result = await graphQLCommon(GET_ADS_BY_LOCATION, variables);
  return result;
};
