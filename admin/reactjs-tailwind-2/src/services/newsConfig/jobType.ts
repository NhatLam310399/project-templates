import { gql } from "apollo-boost";
import {
    ICreateJobType,
    IDeleteJobType,
    IGetAllJobType,
    IUpdateJobType,
} from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_JOB_TYPE = gql`
    query ($filterJobType: FilterJobType, $page: Int, $size: Int) {
        getAllJobType(filterJobType: $filterJobType, page: $page, size: $size) {
            results {
                _id
                name
                description
                keywords
                createdAt
                updatedAt
            }
            totalCount
        }
    }
`;

export const getAllJobType = async (variables: IGetAllJobType) => {
    const response = await graphQLCommon(GET_ALL_JOB_TYPE, variables);
    return response;
};

const UPDATE_JOB_TYPE = gql`
    mutation ($id: String!, $jobTypeInput: JobTypeInput!) {
        updateJobType(id: $id, jobTypeInput: $jobTypeInput) {
            name
            description
        }
    }
`;

export const updateJobType = async (variables: IUpdateJobType) => {
    const response = await graphQLCommon(UPDATE_JOB_TYPE, variables);
    return response;
};

const CREATE_JOB_TYPE = gql`
    mutation ($jobTypeInput: JobTypeInput!) {
        createJobType(jobTypeInput: $jobTypeInput) {
            _id
        }
    }
`;

export const createJobType = async (variables: ICreateJobType) => {
    const response = await graphQLCommon(CREATE_JOB_TYPE, variables);
    return response;
};

const DELETE_JOB_TYPE = gql`
    mutation ($id: String!) {
        deleteJobType(id: $id)
    }
`;

export const deleteJobType = async (variables: IDeleteJobType) => {
    const response = await graphQLCommon(DELETE_JOB_TYPE, variables);
    return response;
};
