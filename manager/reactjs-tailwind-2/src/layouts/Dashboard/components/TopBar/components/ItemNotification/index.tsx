import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import {
  IGraphQLResponse,
  INotification,
  IRootState,
  IUpdateNotification,
} from "common/typings";
import { textWithLimitWords } from "common/functions";
import * as services from "services/notification";

const WORD_LIMIT = 15;
interface IItemNotificationProps {
  notification: INotification;
  className?: string;
  onSeenNotification: () => void;
}

const ItemNotification: React.FC<IItemNotificationProps> = props => {
  const dispatch = useDispatch();
  const {
    notification: { content, title, seen, createdAt, _id } = {},
    className,
    onSeenNotification,
  } = props;

  const { currentUser = {} } = useSelector((state: IRootState) => state.auth);
  const [open, setOpen] = useState(false);
  const [hasMore, setMore] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    if (!content) return;
    const contentLength = content?.split(" ").length;
    if (contentLength > WORD_LIMIT) {
      setMore(true);
    }
  }, [content]);

  useEffect(() => {
    setHasSeen(seen!);
  }, [seen]);

  const handleItemClick = async () => {
    if (!hasSeen) {
      const payload: IUpdateNotification = {
        id: _id!,
        notificationUpdateInput: {
          user: currentUser?.userInfo?._id,
          seen: true,
        },
      };
      const result = await updateNotificationApi(payload);
      if (result) {
        setHasSeen(true);
        onSeenNotification();
      }
    }
  };

  return (
    <div
      onClick={handleItemClick}
      className={`text-body leading-none space-y-1 hover:bg-line ${className}`}
    >
      <p
        className={`text-md font-bold ${
          hasSeen ? "text-body" : "text-primary"
        }`}
      >
        {title}
      </p>
      <p className="text-sm leading-snug">
        {open ? content : textWithLimitWords(content, WORD_LIMIT)}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <button
          type="button"
          className={`hover:underline ${
            hasSeen ? "text-body" : "text-primary"
          } ${hasMore ? "visible" : "invisible"}`}
          onClick={() => {
            setOpen(state => !state);
          }}
        >
          {open ? "Thu gọn" : "Mở rộng"}
        </button>
        <div>{dayjs(createdAt).format("DD/MM/YYYY")}</div>
      </div>
    </div>
  );
};

export default ItemNotification;

const updateNotificationApi = async (payload: IUpdateNotification) => {
  const response: IGraphQLResponse = await services.updateNotification(payload);
  const { updateNotification: result = null } = response?.data || {};
  return result;
};
