import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
    IGetRecruitmentAppliedUser,
    IGetRecruitmentViewedUser,
} from "common/formatTypes";

const GET_RECRUITMENT_VIEWED_USER = gql`
    query ($id: String!, $page: Int, $size: Int) {
        getRecruitmentViewedUser(id: $id, page: $page, size: $size) {
            totalCount
            results {
                _id
                displayName
                username
                firstName
                lastName
                email
                phoneNumber
                urlAvt {
                    default
                    medium
                    small
                }
                enabled
            }
        }
    }
`;

export const getRecruitmentViewedUser = async (
    variables: IGetRecruitmentViewedUser,
) => {
    const response = await graphQLCommon(
        GET_RECRUITMENT_VIEWED_USER,
        variables,
    );
    return response;
};

const GET_RECRUITMENT_APPLIED_USER = gql`
    query ($id: String!, $page: Int, $size: Int) {
        getRecruitmentAppliedUser(id: $id, page: $page, size: $size) {
            totalCount
            results {
                _id
                displayName
                username
                firstName
                lastName
                email
                phoneNumber
                urlAvt {
                    default
                    medium
                    small
                }
                enabled
            }
        }
    }
`;

export const getRecruitmentAppliedUser = async (
    variables: IGetRecruitmentAppliedUser,
) => {
    const response = await graphQLCommon(
        GET_RECRUITMENT_APPLIED_USER,
        variables,
    );
    return response;
};
