import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";

const GET_OVERVIEW = gql`
    query {
        getOverView {
            totalEmployer
            totalCandidate
            totalRecruitment
            totalRecruitmentAvailable
            totalRecruitmentExpired
            totalEvaluate
        }
    }
`;
export const getOverview = async () => {
    const result = await graphQLCommon(GET_OVERVIEW, {});
    return result;
};
