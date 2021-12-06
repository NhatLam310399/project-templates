import { gql } from "apollo-boost";
import { IUpdatePointSetting } from "common/formatTypes";
import { graphQLCommon } from "common/utils/api";

const GET_POINT_SETTING = gql`
    query {
        getPointSetting {
            postPoint
            ratePoint
            viewPoint
            expiredTime
            defaultPoint
        }
    }
`;

export const getPointSetting = async (variables: null) => {
    const response = await graphQLCommon(GET_POINT_SETTING, variables);
    return response;
};

const UPDATE_POINT_SETTING = gql`
    mutation ($pointSettingInput: PointSettingInput!) {
        updatePointSetting(pointSettingInput: $pointSettingInput) {
            postPoint
            ratePoint
            viewPoint
            expiredTime
            defaultPoint
        }
    }
`;

export const updatePointSetting = async (variables: IUpdatePointSetting) => {
    const response = await graphQLCommon(UPDATE_POINT_SETTING, variables);
    return response;
};
