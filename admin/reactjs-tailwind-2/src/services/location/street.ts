import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
    IGetStreet,
    IUpdateStreet,
    ICreateStreet,
    IDeleteStreet,
    IGetById,
} from "common/formatTypes";

const GET_STREETS_BY_WARD_ID = gql`
    query ($wardId: String!, $page: Int = 0, $size: Int) {
        getStreetsByWard(wardId: $wardId, page: $page, size: $size) {
            streets {
                _id
                name
                code
                slug
                longitude
                latitude
                keywords
            }
        }
    }
`;

export const getStreets = async (variables: IGetStreet) => {
    const result = await graphQLCommon(GET_STREETS_BY_WARD_ID, variables);
    return result;
};

const GET_STREET_BY_ID = gql`
    query ($id: String!) {
        getStreetById(id: $id) {
            _id
            name
            code
            province {
                _id
                name
                code
            }
            district {
                _id
                name
                code
            }
            ward {
                _id
                name
                code
            }
            longitude
            latitude
        }
    }
`;

export const getStreetById = async (variables: IGetById) => {
    const result = await graphQLCommon(GET_STREET_BY_ID, variables);
    return result;
};

const CREATE_STREET = gql`
    mutation ($input: StreetTypeInput!) {
        createStreet(streetTypeInput: $input) {
            name
            _id
        }
    }
`;
export const createStreet = async (variables: ICreateStreet) => {
    const result = await graphQLCommon(CREATE_STREET, variables);
    return result;
};

const UPDATE_STREET = gql`
    mutation ($id: String!, $input: StreetTypeInput!) {
        updateStreet(id: $id, streetTypeInput: $input) {
            name
            _id
        }
    }
`;
export const updateStreet = async (variables: IUpdateStreet) => {
    const result = await graphQLCommon(UPDATE_STREET, variables);
    return result;
};

const DELETE_STREET = gql`
    mutation ($id: String!) {
        deleteStreet(id: $id)
    }
`;
export const deleteStreet = async (variables: IDeleteStreet) => {
    const result = await graphQLCommon(DELETE_STREET, variables);
    return result;
};
