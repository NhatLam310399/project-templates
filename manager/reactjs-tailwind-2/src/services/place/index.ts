import { gql } from "apollo-boost";
import {
  IGetKaraokeByBoss,
  IUpdatePlace,
  IGetCompanyByBoss,
} from "common/typings";
import { graphQLCommon } from "common/utils/api";

const place = `_id
name
phoneNumber
email
province {
  _id
  name
  code
}
district {
  _id
  name
  code
}
ward {
  _id
  name
  code
}
street
introduce
images {
  small
  default
}
logo {
  small
  default
}
videos
licenseImages {
  small
  default
}
status
type
user {
  gender
  urlAvt {
    small
    default
  }
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
}
amountRoom
price
rate
highlight
description
enabled
slug
keywords
location {
  type {
    type
  }
  coordinates
}
favorites
createdAt
updatedAt`;
const GET_KARAOKE_BY_BOSS = gql`
  query ($idUser: String) {
    getKaraokeByBoss(idUser: $idUser) {
      ${place}
    }
  }
`;
export const getKaraokeByBoss = async (variables: IGetKaraokeByBoss) => {
  const result = await graphQLCommon(GET_KARAOKE_BY_BOSS, variables);
  return result;
};
const GET_COMPANY_BY_BOSS = gql`
  query ($idUser: String) {
    getCompanyByBoss(idUser: $idUser) {
      ${place}
    }
  }
`;
export const getCompanyByBoss = async (variables: IGetCompanyByBoss) => {
  const result = await graphQLCommon(GET_COMPANY_BY_BOSS, variables);
  return result;
};

const UPDATE_KARAOKE = gql`
  mutation ($id: String!, $placeUpdateInput: PlaceUpdateInput!) {
    updateKaraoke(id: $id, placeUpdateInput: $placeUpdateInput) {
      _id
      name
    }
  }
`;

export const updateKaraoke = async (variables: IUpdatePlace) => {
  const result = await graphQLCommon(UPDATE_KARAOKE, variables);
  return result;
};

const UPDATE_COMPANY = gql`
  mutation ($id: String!, $placeUpdateInput: PlaceUpdateInput!) {
    updateCompany(id: $id, placeUpdateInput: $placeUpdateInput) {
      _id
      name
    }
  }
`;

export const updateCompany = async (variables: IUpdatePlace) => {
  const result = await graphQLCommon(UPDATE_COMPANY, variables);
  return result;
};
