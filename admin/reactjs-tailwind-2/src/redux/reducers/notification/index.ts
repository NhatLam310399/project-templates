import producer from "immer";
import { AnyAction } from "redux";
import * as types from "redux/types/notification";
import { INotificationPayload } from "common/formatTypes";

interface INotification {
    payload: INotificationPayload | Record<string, never>;
}

const initialState: INotification = {
    payload: {},
};

const notificationReducer = (state = initialState, actions: AnyAction) =>
    producer(state, draft => {
        switch (actions.type) {
            case types.SHOW_NOTIFICATION:
                draft.payload = actions.payload;
                break;
            default:
                break;
        }
    });

export default notificationReducer;
