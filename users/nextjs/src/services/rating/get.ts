import { gql } from "apollo-boost";
import { IGetRatingByUserId } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";

const GET_RATING_BY_USER_ID = gql`
  query($userId: String!) {
    getRatingByUser(userId: $userId) {
      _id
      user {
        _id
        displayName
      }
      rate
    }
  }
`;

export const getRatingByUserId = async (variables: IGetRatingByUserId) => {
  const response = await graphQLCommon(GET_RATING_BY_USER_ID, variables);
  return response;
};
