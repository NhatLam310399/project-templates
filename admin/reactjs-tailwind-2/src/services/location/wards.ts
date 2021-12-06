import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import {
    ICreateWards,
    IDeleteWard,
    IGetWards,
    IUpdateWards,
} from "common/formatTypes";

const GET_WARDS_BY_DISTRICT = gql`
    query (
        $districtCode: String
        $page: Int = 0
        $size: Int
        $wardName: String
    ) {
        getWardsByDistrict(
            wardName: $wardName
            districtCode: $districtCode
            page: $page
            size: $size
        ) {
            totalCount
            wards {
                _id
                name
                code
                districtCode
                districtName
                provinceCode
                provinceName
                latitude
                longitude
            }
        }
    }
`;
export const getWardsByDistrict = async (variables: IGetWards) => {
    const result = await graphQLCommon(GET_WARDS_BY_DISTRICT, variables);
    return result;
};

const UPDATE_WARD = gql`
    mutation ($id: String!, $wardInput: WardInput!) {
        updateWard(id: $id, wardInput: $wardInput) {
            name
        }
    }
`;
export const updateWard = async (variables: IUpdateWards) => {
    const result = await graphQLCommon(UPDATE_WARD, variables);
    return result;
};

const CREATE_WARD = gql`
    mutation ($wardInput: WardInput!) {
        createWard(wardInput: $wardInput) {
            _id
            name
        }
    }
`;
export const createWard = async (variables: ICreateWards) => {
    const result = await graphQLCommon(CREATE_WARD, variables);
    return result;
};
const DELETE_WARD = gql`
    mutation ($id: String!) {
        deleteWard(id: $id)
    }
`;
export const deleteWard = async (variables: IDeleteWard) => {
    const result = await graphQLCommon(DELETE_WARD, variables);
    return result;
};
