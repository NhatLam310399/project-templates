import { gql } from "apollo-boost";
import { IGetEvaluateByUserId } from "@common/typings";
import { graphQLCommon } from "@common/utils/api";

const GET_EVALUATE_BY_USER_ID = gql`
  query($userId: String!) {
    getEvaluateByUser(userId: $userId) {
      _id
      user {
        email
      }
      evaluator {
        email
      }
      avgPoint
    }
  }
`;

export const getEvaluateByUserId = async (variables: IGetEvaluateByUserId) => {
  const response = await graphQLCommon(GET_EVALUATE_BY_USER_ID, variables);
  return response;
};
