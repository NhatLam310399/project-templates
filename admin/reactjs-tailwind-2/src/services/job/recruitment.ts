import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
    IGetAllRecruitment,
    ICrateRecruitmentInput,
    IUpdateRecruitment,
    IDeleteRecruitment,
} from "common/formatTypes";

const GET_ALL_JOB = gql`
    query ($filterRecruitment: FilterRecruitment, $page: Int, $size: Int) {
        getAllRecruitment(
            filterRecruitment: $filterRecruitment
            page: $page
            size: $size
        ) {
            totalCount
            results {
                name
                expiredDate
                createdAt
                _id
                description
                requirement
                view
                slug
                career {
                    name
                    categoryLevel1 {
                        name
                    }
                }
                user{
                    displayName
                    code
                }
                company {
                    _id
                    name
                    code
                    career {
                        name
                        categoryLevel1 {
                            name
                        }
                    }
                    user {
                        firstName
                        lastName
                        displayName
                        _id
                    }
                }
                salaryMin
                salaryMax
                keywords {
                    _id
                    name
                    description
                    keywords
                    isHot
                }
            }
        }
    }
`;

export const getAllJob = async (variables: IGetAllRecruitment) => {
    const response = await graphQLCommon(GET_ALL_JOB, variables);
    return response;
};

const CREATE_JOB = gql`
    mutation ($recruitmentCreateInput: RecruitmentCreateInput!) {
        createRecruitment(recruitmentCreateInput: $recruitmentCreateInput) {
            _id
        }
    }
`;

export const CreateJob = async (variables: ICrateRecruitmentInput) => {
    const response = await graphQLCommon(CREATE_JOB, variables);
    return response;
};

const UPDATE_JOB = gql`
    mutation ($recruitmentUpdateInput: RecruitmentUpdateInput!, $id: String!) {
        updateRecruitment(
            recruitmentUpdateInput: $recruitmentUpdateInput
            id: $id
        ) {
            name
            _id
        }
    }
`;

export const UpdateJob = async (variables: IUpdateRecruitment) => {
    const response = await graphQLCommon(UPDATE_JOB, variables);

    return response;
};

const DELETE_JOB = gql`
    mutation ($id: String!) {
        deleteRecruitment(id: $id)
    }
`;

export const DeleteJob = async (variables: IDeleteRecruitment) => {
    const response = await graphQLCommon(DELETE_JOB, variables);
    return response;
};
