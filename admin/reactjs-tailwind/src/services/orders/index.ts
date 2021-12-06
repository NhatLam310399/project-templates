import { gql } from "apollo-boost";
import { IById, IGetAllOrders } from "common/typings";

import { graphQLCommon } from "common/utils/api";

const GET_ALL_ORDERS = gql`
  query ($filterOrders: FilterOrders, $page: Int, $size: Int) {
    getAllOrders(filterOrders: $filterOrders, page: $page, size: $size) {
      totalCount
      results {
        _id
        fullName
        email
        phoneNumber
        transportFee
        totalPrice
        paymentMethods
        status
        basicDocument {
          name
        }
        dateOfPayment
        paymentDetail
        createdAt
        updatedAt
      }
    }
  }
`;

export const getAllOrders = async (variables: IGetAllOrders) => {
  const result = await graphQLCommon(GET_ALL_ORDERS, variables);
  return result;
};

const DELETE_ORDER_BY_ID = gql`
  mutation ($id: String!) {
    deleteOrderById(id: $id)
  }
`;

export const deleteOrderById = async (variables: IById) => {
  const response = await graphQLCommon(DELETE_ORDER_BY_ID, variables);
  return response;
};
