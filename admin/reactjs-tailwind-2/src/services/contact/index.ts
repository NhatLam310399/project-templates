import { gql } from "apollo-boost";
import { IDeleteContact } from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_CONTACT = gql`
    query {
        getAllContact {
            results {
                _id
                name
                email
                title
                description
            }
            totalCount
        }
    }
`;

export const getAllContact = async (variables: null) => {
    const response = await graphQLCommon(GET_ALL_CONTACT, variables);
    return response;
};

const DELETE_CONTACT = gql`
    mutation ($id: String!) {
        deleteContact(id: $id)
    }
`;

export const deleteContact = async (variables: IDeleteContact) => {
    const response = await graphQLCommon(DELETE_CONTACT, variables);
    return response;
};
