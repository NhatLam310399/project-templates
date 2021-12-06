import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";
import { IDeleteBooking } from "common/typings";

const DELETE = gql`
  mutation ($id: String!) {
    removeBooking(id: $id)
  }
`;
export const deleteBooking = async (variables: IDeleteBooking) => {
  const result = await graphQLCommon(DELETE, variables);
  return result;
};
