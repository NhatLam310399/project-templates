import { gql } from "apollo-boost";
import { graphQLCommon } from "@common/utils/api";
import { IGetAllContentWebsite, IGetSEO } from "@common/typings";

const GET_CONTENT_WEBSITE = gql`
  query {
    getAllContentWebsite(filterContentWebsite: null, page: 0, size: 1) {
      results {
        _id
        address
        phone
        footerUserInfo
        footerEmployerInfo
        customCodeHeader
        customCodeFooter
        photos {
          small
          default
          medium
        }
        colorLogo {
          small
          default
          medium
        }
        whiteLogo {
          small
          default
          medium
        }
      }
    }
  }
`;
export const getAllContentWebsite = async (
  variables: IGetAllContentWebsite,
) => {
  const response = await graphQLCommon(GET_CONTENT_WEBSITE, variables);
  return response;
};

const GET_SEO = gql`
  query($language: String!) {
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
    }
  }
`;
export const getSeo = async (variables: IGetSEO) => {
  const response = await graphQLCommon(GET_SEO, variables);
  return response;
};
