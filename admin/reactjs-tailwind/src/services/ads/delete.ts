import { gql } from "apollo-boost";
import { IById } from "common/typings";
import { graphQLCommon } from "common/utils/api";

const REMOVE_ADS = gql`
  mutation ($id: String!) {
    removeAds(id: $id)
  }
`;
export const removeAds = async (variables: IById) => {
  const result = await graphQLCommon(REMOVE_ADS, variables);
  return result;
};
