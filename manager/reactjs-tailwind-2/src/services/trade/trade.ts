import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import {
  IById,
  ICreateTrade,
  IGetAllTrade,
  IUpdateTrade,
} from "common/typings";

const GET_ALL_TRADE = gql`
  query ($filterTrade: FilterTrade, $page: Int, $size: Int) {
    getAllTrade(filterTrade: $filterTrade, page: $page, size: $size) {
      totalCount
      results {
        _id
        images {
          default
          small
        }
        videos
        name
        description
        price
        province {
          _id
          name
          code
        }
        rate
        type {
          _id
          name
          code
        }
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
  const response = await graphQLCommon(GET_ALL_TRADE, variables);
  return response;
};

const CREATE_TRADE = gql`
  mutation ($tradeInput: TradeCreateInput!) {
    createTrade(tradeInput: $tradeInput) {
      _id
      name
    }
  }
`;

export const createTrade = async (variables: ICreateTrade) => {
  const response = await graphQLCommon(CREATE_TRADE, variables);
  return response;
};

const UPDATE_TRADE = gql`
  mutation ($id: String!, $tradeInput: TradeUpdateInput!) {
    updateTrade(id: $id, tradeInput: $tradeInput) {
      _id
      name
    }
  }
`;

export const updateTrade = async (variables: IUpdateTrade) => {
  const response = await graphQLCommon(UPDATE_TRADE, variables);
  return response;
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
