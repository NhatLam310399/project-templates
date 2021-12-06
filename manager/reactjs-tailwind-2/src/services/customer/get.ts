import { gql } from "apollo-boost";
import { IGetAllCustomerByKaraoke } from "common/typings";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_CUSTOMER_BY_KARAOKE = gql`
  query ($idKara: String, $page: Int, $size: Int) {
    getAllCustomerByKaraoke(idKara: $idKara, page: $page, size: $size) {
      totalCount
      results {
        user {
          _id
          displayName
          username
          email
          phoneNumber
          urlAvt {
            small
            default
          }
        }
        amount
        bookingStartDate
      }
    }
  }
`;

export const getAllCustomerByKaraoke = async (
  variable: IGetAllCustomerByKaraoke,
) => {
  const response = await graphQLCommon(GET_ALL_CUSTOMER_BY_KARAOKE, variable);
  return response;
};
