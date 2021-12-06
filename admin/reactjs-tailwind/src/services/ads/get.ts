import { gql } from "apollo-boost";
import { IById, ICreateAds, IGetAdsAll, IUpdateAds } from "common/typings";
import { graphQLCommon } from "common/utils/api";

const GET_ADS_ALL = gql`
  query ($filterAds: FilterAds) {
    getAdsAll(filterAds: $filterAds) {
      _id
      name
      urlImage {
        default
        medium
        small
      }
      displayLocation {
        name
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

const GET_ADS_ALL_BY_LOCATION = gql`
  query ($displayLocation: String) {
    getAdsAllByLocation(displayLocation: $displayLocation) {
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
        slug
        _id
      }
      link
    }
  }
`;
export const getAdsAllByLocation = async (variables: IGetAdsAll) => {
  const result = await graphQLCommon(GET_ADS_ALL_BY_LOCATION, variables);
  return result;
};

const GET_ADS_BY_ID = gql`
  query ($id: String!) {
    getAdsById(id: $id) {
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
export const getAdsById = async (variables: IById) => {
  const result = await graphQLCommon(GET_ADS_BY_ID, variables);
  return result;
};
