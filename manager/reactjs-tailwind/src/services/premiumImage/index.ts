import { gql } from "apollo-boost";
import {
  IGetAllPremiumImage
} from "typings";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_PREMIUM_IMAGE = gql`
query GetAllPremiumImage($filterPremiumImage: FilterPremiumImage) {
  getAllPremiumImage(filterPremiumImage: $filterPremiumImage) {
    totalCount
    results {
      _id
      name
      image {
        default
        medium
        small
        base64Image
      }
      width
      height
      quality
      price
      tag
    }
  }
}
`;
export const getAllPremiumImage = async (variables: IGetAllPremiumImage) => {
  const result = await graphQLCommon(GET_ALL_PREMIUM_IMAGE, variables);
  return result;
};
