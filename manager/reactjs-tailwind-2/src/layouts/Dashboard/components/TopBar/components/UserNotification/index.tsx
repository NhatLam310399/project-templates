import { IRootState } from "redux/reducers";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popover } from "@material-ui/core";

import SVG from "designs/SVG";
import { getAllNotification } from "redux/actions/notificationApi";
import { IGetAllNotification, INotification } from "common/typings";

import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "@material-ui/lab";
import ItemNotification from "../ItemNotification";

const SIZE_PER_PAGE = 10;

interface IUserNotificationProps {}

const UserNotification: React.FC<IUserNotificationProps> = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: IRootState) => state.auth);
  const { place } = useSelector((state: IRootState) => state.place);
  const {
    allNotification: { results, totalCount },
  } = useSelector((state: IRootState) => state.notificationApi);
  const { isLoading } = useSelector((state: IRootState) => state.common);

  const [page, setPage] = useState(0);
  const [notificationList, setNotificationList] = useState<INotification[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [hasUnseen, setHasUnseen] = useState<boolean>(false);

  const checkUnseen = () => {
    const allSeen = results.every(item => item?.seen === true);
    if (allSeen) {
      hasUnseen && setHasUnseen(false);
    } else {
      !hasUnseen && setHasUnseen(true);
    }
  };

  useEffect(() => {
    setNotificationList(state => [...state, ...results]);
    if (!hasUnseen) {
      checkUnseen();
    }
  }, [results]);

  const getAllNotificationAPI = (pageNumber = 0) => {
    const payload: IGetAllNotification = {
      filterNotification: {
        permission: currentUser?.userInfo?.permission,
        user: currentUser?.userInfo?._id,
      },
      page: pageNumber,
      size: SIZE_PER_PAGE,
    };
    dispatch(getAllNotification(payload));
  };

  useEffect(() => {
    if (place) {
      getAllNotificationAPI(page);
    }
  }, [page, place]);

  const handleFetchMoreData = () => {
    setPage(state => state + 1);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSeenNotification = (
    notification: INotification,
    index: number,
  ) => {
    return () => {
      let allSeen = true;
      const newList = notificationList.map((item, indexItem) => {
        if (indexItem === index) {
          return { ...item, seen: true };
        }

        if (allSeen && !item?.seen) {
          allSeen = false;
        }
        return item;
      });
      setNotificationList(newList);
      setHasUnseen(!allSeen);
    };
  };

  return (
    <div className="leading-none">
      <button type="button" className="block relative" onClick={handleClick}>
        <SVG name="common/bell" className="w-2" />
        {hasUnseen && (
          <div className="block w-1 h-1 absolute top-0.1 right-0 rounded-full bg-error border-2 border-solid border-white" />
        )}
      </button>
      <Popover
        // disablePortal
        // keepMounted
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="pt-1"
      >
        <div
          className="py-1 w-32 max-w-full max-h-30 overflow-y-auto"
          id="scrollableNotification"
        >
          <p className="text-xl font-bold text-black px-2 py-1">Thông báo</p>
          {notificationList.length < 1 && (
            <div className="px-2 pb-1 text-md font-bold text-body">
              Chưa có thông báo
            </div>
          )}

          <InfiniteScroll
            dataLength={notificationList.length}
            next={handleFetchMoreData}
            hasMore={
              notificationList.length < totalCount &&
              notificationList.length <= 30
            }
            loader={<SkeletonNotification />}
            scrollableTarget="scrollableNotification"
            className="block"
          >
            {notificationList.map((item, index) => (
              <ItemNotification
                onSeenNotification={handleSeenNotification(item, index)}
                className="block w-full px-2 py-1"
                notification={item}
                key={String(index)}
              />
            ))}
          </InfiniteScroll>
        </div>
      </Popover>
    </div>
  );
};

export default UserNotification;

const SkeletonNotification: React.FC = () => (
  <div className="py-1 px-2 space-y-1">
    <Skeleton width="100%" height={15} variant="rect" />
    <Skeleton width="80%" height={12} variant="rect" />
  </div>
);
