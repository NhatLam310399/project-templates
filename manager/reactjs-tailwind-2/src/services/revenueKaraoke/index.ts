import { graphQLCommon } from "common/utils/api";
import { gql } from "apollo-boost";
import { IGetRevenueKaraoke } from "common/typings";

const GET_REVENUE_KARAOKE = gql`
  query ($idKara: String, $year: Date) {
    getRevenueKaraoke(idKara: $idKara, year: $year) {
      january
      february
      march
      april
      may
      june
      july
      august
      september
      october
      november
      december
    }
  }
`;

export const getRevenueKaraoke = async (variables: IGetRevenueKaraoke) => {
  const response = await graphQLCommon(GET_REVENUE_KARAOKE, variables);
  return response;
};
