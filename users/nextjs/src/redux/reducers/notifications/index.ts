import produce from "immer";
import { AnyAction } from "redux";

import * as types from "@redux/types/notification";
import { INotification, INotificationSetting } from "@common/typings";

interface INotificationsState {
  notifications: {
    getNotifyByUser: INotification[];
    loading: boolean;
  };
  notificationsSetting: {
    results: INotificationSetting[];
    loading: boolean;
  };
}

const initialState: INotificationsState = {
  notifications: {
    getNotifyByUser: [],
    loading: true,
  },
  notificationsSetting: {
    results: [],
    loading: true,
  },
};

const notifications = (state = initialState, action: AnyAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case types.GET_NOTIFICATIONS_BY_USER_SUCCESS:
        draft.notifications.getNotifyByUser = action.payload;
        draft.notifications.loading = false;
      case types.GET_NOTIFICATIONS_SETTING_SUCCESS:
        draft.notificationsSetting = { ...action.payload, loading: false };
        break;
    }
  });
};

export default notifications;
