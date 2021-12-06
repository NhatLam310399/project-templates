import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/notification";
import { INotificationPayload } from "common/typings";

interface INotification {
  payload: INotificationPayload | Record<string, never>;
}

const initialState: INotification = {
  payload: {},
};

export default (state = initialState, actions: AnyAction) =>
  producer(state, draft => {
    switch (actions.type) {
      case types.SHOW_NOTIFICATION:
        draft.payload = actions.payload;
        break;
      default:
        break;
    }
  });
