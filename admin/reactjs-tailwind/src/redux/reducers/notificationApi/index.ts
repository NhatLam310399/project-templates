import produce from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/notificationApi";
import { INotification } from "common/typings";

interface INotificationState {
  allNotification: {
    results: INotification[];
    totalCount: number;
  };
}

const initialState: INotificationState = {
  allNotification: {
    results: [],
    totalCount: 0,
  },
};

const notificationApiReducer = (state = initialState, action: AnyAction) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_ALL_NOTIFICATION_SUCCESS:
        draft.allNotification = action.payload;
        break;

      default:
        break;
    }
  });

export default notificationApiReducer;
