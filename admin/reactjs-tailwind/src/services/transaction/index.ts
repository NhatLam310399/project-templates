import { gql } from "apollo-boost";
import { IById, IGetAllTransaction } from "common/typings";

import { graphQLCommon } from "common/utils/api";

const GET_ALL_TRANSACTION = gql`
  query ($filterTransaction: FilterTransaction, $page: Int, $size: Int) {
    getAllTransaction(
      filterTransaction: $filterTransaction
      page: $page
      size: $size
    ) {
      totalCount
      results {
        _id
        userBuy {
          _id
          username
        }
        companySell {
          _id
          name
        }
        trade {
          _id
          name
        }
        price
        slug
        keywords
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllTransaction = async (variables: IGetAllTransaction) => {
  const result = await graphQLCommon(GET_ALL_TRANSACTION, variables);
  return result;
};

const DELETE_TRANSACTION_BY_ID = gql`
  mutation ($id: String!) {
    deleteTransactionById(id: $id)
  }
`;

export const deleteTransactionById = async (variables: IById) => {
  const response = await graphQLCommon(DELETE_TRANSACTION_BY_ID, variables);
  return response;
};
