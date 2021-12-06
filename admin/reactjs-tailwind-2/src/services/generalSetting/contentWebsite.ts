import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IUpdateContentWebsite } from "common/formatTypes/GeneralSetting";
import { IGetById } from "common/formatTypes";

const GET_CONTENT_WEBSITE_BY_ID = gql`
    query ($id: String!) {
        getContentWebsiteById(id: $id) {
            _id
            whiteLogo {
                default
                medium
                small
            }
            colorLogo {
                default
                medium
                small
            }
            photos {
                default
                medium
                small
            }
            address
            phone
            footerUserInfo
            footerEmployerInfo
            customCodeHeader
            customCodeFooter
        }
    }
`;
export const getContentWebsiteById = async (variable: IGetById) => {
    const response = await graphQLCommon(GET_CONTENT_WEBSITE_BY_ID, variable);
    return response;
};

const UPDATE_CONTENT_WEBSITE = gql`
    mutation ($id: String!, $fieldsToUpdate: ContentWebsiteUpdateInput!) {
        updateContentWebsite(fieldsToUpdate: $fieldsToUpdate, id: $id) {
            _id
        }
    }
`;
export const updateContentWebsite = async (variable: IUpdateContentWebsite) => {
    const response = await graphQLCommon(UPDATE_CONTENT_WEBSITE, variable);
    return response;
};
