import { gql } from "apollo-boost";
import {
  IById,
  ICreateTrade,
  IGetAllTrade,
  IUpdateTrade,
} from "common/typings";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_TRADE = gql`
  query ($filterTrade: FilterTrade, $page: Int, $size: Int) {
    getAllTrade(filterTrade: $filterTrade, page: $page, size: $size) {
      totalCount
      results {
        _id
        company {
          _id
          name
        }
        name
        description
        price
        province {
          _id
          name
          code
          latitude
          longitude
        }
        images {
          small
          default
          medium
        }
        rate
        type {
          name
          code
          value
          slug
          language
        }
        videos
        quantity
        isHot
        keywords
        phoneNumberInstallationSupport
        phoneNumberSeller
        createdAt
        updatedAt
      }
    }
  }
`;
export const getAllTrade = async (variables: IGetAllTrade) => {
  const result = await graphQLCommon(GET_ALL_TRADE, variables);
  return result;
};

const CREATE_TRADE = gql`
  mutation ($tradeInput: TradeCreateInput!) {
    createTrade(tradeInput: $tradeInput) {
      _id
    }
  }
`;
export const createTrade = async (variables: ICreateTrade) => {
  const result = await graphQLCommon(CREATE_TRADE, variables);
  return result;
};

const UPDATE_TRADE = gql`
  mutation ($id: String!, $tradeInput: TradeUpdateInput!) {
    updateTrade(id: $id, tradeInput: $tradeInput) {
      _id
    }
  }
`;
export const updateTrade = async (variables: IUpdateTrade) => {
  const result = await graphQLCommon(UPDATE_TRADE, variables);
  return result;
};

const DELETE_TRADE = gql`
  mutation ($id: String!) {
    deleteTrade(id: $id)
  }
`;
export const deleteTrade = async (variables: IById) => {
  const result = await graphQLCommon(DELETE_TRADE, variables);
  return result;
};
