import producer from "immer";
import * as types from "redux/types/room";
import { IRoom } from "common/typings";
import { AnyAction } from "redux";

interface IRoomProps {
  rooms: {
    results: IRoom[];
    totalCount: number;
  };
}

const initialState: IRoomProps = {
  rooms: {
    results: [],
    totalCount: 0,
  },
};

export default (state = initialState, actions: AnyAction) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.GET_ROOM_BY_KARAOKE_SUCCESS:
        draft.rooms = actions.payload;
        break;
      default:
        break;
    }
  });
