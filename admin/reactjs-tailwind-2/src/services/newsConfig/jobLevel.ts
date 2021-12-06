import { gql } from "apollo-boost";
import {
    ICreateJobLevel,
    IDeleteJobLevel,
    IUpdateJobLevel,
} from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_JOB_LEVEL = gql`
    query {
        getAllJobLevel {
            totalCount
            results {
                _id
                name
                description
                slug
                createdAt
                keywords
            }
        }
    }
`;

export const getAllJobLevel = async () => {
    const response = await graphQLCommon(GET_ALL_JOB_LEVEL, null);
    return response;
};

const UPDATE_JOB_LEVEL = gql`
    mutation ($jobLevelInput: JobLevelInput!, $id: String!) {
        updateJobLevel(jobLevelInput: $jobLevelInput, id: $id) {
            _id
            name
        }
    }
`;

export const updateJobLevel = async (variables: IUpdateJobLevel) => {
    const response = await graphQLCommon(UPDATE_JOB_LEVEL, variables);
    return response;
};

const CREATE_JOB_LEVEL = gql`
    mutation ($jobLevelInput: JobLevelInput!) {
        createJobLevel(jobLevelInput: $jobLevelInput) {
            _id
            name
        }
    }
`;

export const createJobLevel = async (variables: ICreateJobLevel) => {
    const response = await graphQLCommon(CREATE_JOB_LEVEL, variables);
    return response;
};

const DELETE_JOB_LEVEL = gql`
    mutation ($id: String!) {
        deleteJobLevel(id: $id)
    }
`;

export const deleteJobLevel = async (variables: IDeleteJobLevel) => {
    const response = await graphQLCommon(DELETE_JOB_LEVEL, variables);
    return response;
};
