import { gql } from "apollo-boost";
import { IGetById } from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const REMOVE_ADS = gql`
    mutation ($id: String!) {
        removeAds(id: $id)
    }
`;
export const removeAds = async (variables: IGetById) => {
    const result = await graphQLCommon(REMOVE_ADS, variables);
    return result;
};
