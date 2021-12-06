import { gql } from "apollo-boost";
import { IById, ICreateRoom, IGetAllRoom, IUpdateRoom } from "common/typings";
import { graphQLCommon } from "common/utils/api";

const GET_ALL_ROOM = gql`
  query ($filterRoom: FilterRoom, $page: Int, $size: Int) {
    getAllRoom(filterRoom: $filterRoom, page: $page, size: $size) {
      totalCount
      results {
        _id
        name
        place {
          _id
          name
          email
          phoneNumber
        }
        description
        price
        pricePromotion
        image {
          small
          default
        }
        video
        amount
        slug
        keywords
        createdAt
        updatedAt
      }
    }
  }
`;
export const getAllRoom = async (variables: IGetAllRoom) => {
  const result = await graphQLCommon(GET_ALL_ROOM, variables);
  return result;
};

const CREATE_ROOM = gql`
  mutation ($roomCreateInput: RoomCreateInput!) {
    createRoom(roomCreateInput: $roomCreateInput) {
      _id
      name
      image {
        small
        default
      }
      video
    }
  }
`;
export const createRoom = async (variables: ICreateRoom) => {
  const result = await graphQLCommon(CREATE_ROOM, variables);
  return result;
};

const UPDATE_ROOM = gql`
  mutation ($id: String!, $roomUpdateInput: RoomUpdateInput!) {
    updateRoom(id: $id, roomUpdateInput: $roomUpdateInput) {
      _id
      name
      image {
        small
        default
      }
      video
    }
  }
`;
export const updateRoom = async (variables: IUpdateRoom) => {
  const result = await graphQLCommon(UPDATE_ROOM, variables);
  return result;
};

const DELETE_ROOM_BY_ID = gql`
  mutation ($id: String!) {
    deleteRoomById(id: $id)
  }
`;
export const deleteRoomById = async (variables: IById) => {
  const result = await graphQLCommon(DELETE_ROOM_BY_ID, variables);
  return result;
};
