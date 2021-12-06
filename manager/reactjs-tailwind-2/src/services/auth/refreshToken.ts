import { gql } from "apollo-boost";
import { graphQLCommon } from "common/utils/api";

const REFRESH_TOKEN = gql`
  query {
    refreshToken {
      accessToken
      refreshToken
      userId {
        id
      }
      userInfo {
        _id
        language
        highlight
        lastSeenAt
        deviceToken
        rate
        clientId
        provider
        birthday
        gender
        urlAvt {
          small
          default
        }
        identifyCard
        displayName
        username
        email
        phoneNumber
        permission
        province {
          _id
          code
          name
        }
        district {
          _id
          code
          name
        }
        ward {
          _id
          code
          name
        }
        street
        enabled
        nameOnBankCard
        bankCardNumber
        bankName
        tradingAddress
        isHot
        coupon {
          _id
          name
        }
        slug
        keywords
        favouriteKaraoke {
          _id
          name
        }
        point
        createdAt
        updatedAt
        documents {
          _id
          name
        }
      }
    }
  }
`;

export const refreshToken = async () => {
  const result = await graphQLCommon(REFRESH_TOKEN, {});
  return result;
};
