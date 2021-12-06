import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IGetAllChallengeType } from "typings";

const GET_ALL_CHALLENGE_TYPE = gql`
query($filterChallengeType: FilterChallengeType){
  getAllChallengeType(filterChallengeType:$filterChallengeType)
  {
    results{
      _id
      user{
        _id
        challengePoint
      }
      doneChallenge
      name
      icon{
        default
        base64Image
      }
      content
      challenge{
        _id
        point
        name
        icon{
          default
          base64Image
        }
        content
        stepNumber
      }
    }
  }
}
`;

export const getAllChallengeType = async (variables: IGetAllChallengeType) => {
  const response = await graphQLCommon(GET_ALL_CHALLENGE_TYPE, variables);
  return response;
};