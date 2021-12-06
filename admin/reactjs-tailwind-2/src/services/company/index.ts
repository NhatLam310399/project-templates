import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
    IGetById,
    ICreateCompany,
    IGetCompanies,
    IUpdateCompany,
    IDeleteCompany,
} from "common/formatTypes";

const GET_COMPANIES = gql`
    query ($filterCompany: FilterCompany, $page: Int, $size: Int) {
        getCompanies(filterCompany: $filterCompany, page: $page, size: $size) {
            totalCount
            results {
                name
                code
                _id
                phoneNumber
                career {
                    _id
                    name
                    categoryLevel1 {
                        name
                    }
                }
                user {
                    firstName
                    lastName
                    displayName
                    email
                    _id
                }
                description
                size
                isHot
                isTop
                logo {
                    default
                    small
                }
                images {
                    default
                }
                location
                slug
            }
        }
    }
`;

export const getCompanies = async (variables: IGetCompanies) => {
    const response = await graphQLCommon(GET_COMPANIES, variables);
    return response;
};

const GET_COMPANY_BY_ID = gql`
    query ($id: String!) {
        getCompanyById(id: $id) {
            _id
            name
            code
            highlight
            description
            defaultRecord
            career {
                _id
                name
            }
            size
            isHot
            isTop
            status
            view
            subscribe
            location
            user {
                _id
                displayName
                username
                email
                phoneNumber
            }
            contactName
            phoneNumber
            benefits {
                icon {
                    _id
                    icon {
                        default
                        small
                    }
                    name
                }
                content
            }
            images {
                default
                medium
                small
            }
            logo {
                default
                medium
                small
            }
            videos
            point
            slug
            keywords
            createdAt
            updatedAt
        }
    }
`;

export const getCompanyById = async (variables: IGetById) => {
    const response = await graphQLCommon(GET_COMPANY_BY_ID, variables);
    return response;
};

const CREATE_COMPANY = gql`
    mutation ($companyCreateInput: CompanyCreateInput!) {
        createCompany(companyCreateInput: $companyCreateInput) {
            _id
            name
        }
    }
`;

export const createCompany = async (variables: ICreateCompany) => {
    const response = await graphQLCommon(CREATE_COMPANY, variables);
    return response;
};

const UPDATE_COMPANY = gql`
    mutation ($id: String!, $companyUpdateInput: CompanyUpdateInput!) {
        updateCompany(id: $id, companyUpdateInput: $companyUpdateInput) {
            _id
            name
        }
    }
`;

export const updateCompany = async (variables: IUpdateCompany) => {
    const response = await graphQLCommon(UPDATE_COMPANY, variables);
    return response;
};

const DELETE_COMPANY = gql`
    mutation ($id: String!) {
        deleteCompany(id: $id)
    }
`;

export const deleteCompany = async (variables: IDeleteCompany) => {
    const response = await graphQLCommon(DELETE_COMPANY, variables);
    return response;
};
