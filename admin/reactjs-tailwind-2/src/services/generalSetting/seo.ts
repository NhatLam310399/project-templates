import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IGetByLanguage, IUpdateSeoInput } from "common/formatTypes";

const GET_SEO = gql`
    query ($language: String!) {
        getSeo(language: $language) {
            _id
            seoTitle
            seoKeyword
            author
            seoSiteMap
            seoDescription
            footerContentOfHomepage
            footerContentOfJobPosting
            footerContentOfEmployee
            createdAt
            updatedAt
            language
        }
    }
`;
export const getSeo = async (variables: IGetByLanguage) => {
    const response = await graphQLCommon(GET_SEO, variables);
    return response;
};

const UPDATE_SEO = gql`
    mutation ($fieldsToUpdate: UpdateSeoInput!) {
        updateSeo(fieldsToUpdate: $fieldsToUpdate) {
            _id
            seoTitle
        }
    }
`;
export const updateSeo = async (variables: IUpdateSeoInput) => {
    const response = await graphQLCommon(UPDATE_SEO, variables);
    return response;
};
