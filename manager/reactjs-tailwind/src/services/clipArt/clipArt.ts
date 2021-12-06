import { gql } from "apollo-boost";
import {
  IClipArt
} from "typings";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_CLIP_ART = gql`
 query Results($filterClipArt: FilterClipArt, $page: Int, $size: Int) {
  getAllClipArt(filterClipArt: $filterClipArt, page: $page, size: $size) {
    results {
      _id
      name
      isStaticColor
      image {
        medium
        default
        base64Image
      }
      width
      height
      quality
      category {
        _id
        name
        code
      }
      isPro
    }
    totalCount
  }
}
`;
export const getAllClipArt = async (variables: IClipArt) => {
  const result = await graphQLCommon(GET_ALL_CLIP_ART, variables);
  return result;
};
