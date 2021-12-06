import { useDispatch, useSelector } from "react-redux";

import { setOpenNotification } from "@redux/actions/common";
import { IRootState } from "@redux/reducers";

import { NotificationContainer, Icon } from "./styles";
import { useEffect, useState } from "react";
import { setSeenForNotify } from "@redux/actions/notification";

const Notification: React.FC = (props) => {
  const dispatch = useDispatch();
  const { isOpenNotification } = useSelector(
    (state: IRootState) => state.actions,
  );
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const {
    notifications: { loading = true, getNotifyByUser: result = [] },
    notificationsSetting: {
      loading: loadingSetting = false,
      results: notifySetting = [],
    },
  } = useSelector((state: IRootState) => state.notify);
  const [seen, setSeen] = useState(false);

  const handleClick = () => {
    dispatch(setOpenNotification(!isOpenNotification));
  };

  useEffect(() => {
    if (isOpenNotification) return;
    let seenNotifyUser = false;
    let seenNotifyAdmin = false;
    if (!loading && result?.length > 0) {
      //check notify of user
      const stateSeenList = result?.map((notify) => notify.seen);
      const existStateSeen = stateSeenList.includes(false); // = true, mean is not seen
      if (existStateSeen) {
        seenNotifyUser = false;
      } else {
        seenNotifyUser = true;
      }
    } else {
      seenNotifyUser = true;
    }
    if (notifySetting?.length > 0) {
      //check notify from admin
      const listName = notifySetting?.map((notify) => notify?.name);
      const notifies = localStorage.getItem("notifyAdmin");
      const lastNotify = listName?.pop();
      if (!notifies) {
        seenNotifyAdmin = false;
        localStorage.setItem("notifyAdmin", lastNotify);
      }
      if (lastNotify === notifies) {
        seenNotifyAdmin = true;
      }
    } else {
      seenNotifyAdmin = true;
    }
    setSeen(seenNotifyUser && seenNotifyAdmin);
  }, [result, notifySetting]);

  useEffect(() => {
    if (isOpenNotification) {
      if (seen) return;
      const listName = notifySetting?.map((notify) => notify?.name);
      const lastNotify = listName?.pop();
      const notifies = localStorage.getItem("notifyAdmin");
      if (notifies) {
        localStorage.setItem("notifyAdmin", lastNotify);
      }
      const stateSeenList = result?.map((notify) => notify.seen);
      const existStateSeen = stateSeenList.includes(false); // = true, mean is not seen
      if (existStateSeen) {
        dispatch(setSeenForNotify({ userId: currentUser?.userInfo?._id }));
      }
      setSeen(true);
    }
  }, [isOpenNotification]);

  return (
    <NotificationContainer onClick={handleClick}>
      <Icon
        name={`common/menu/${
          !loading ? (seen ? "noNotify" : "haveNotify") : "noNotify"
        }`}
        width={24}
        height={24}
      />
    </NotificationContainer>
  );
};

export default Notification;
