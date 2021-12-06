import React, { useEffect, useRef, useState } from "react";

import { ICareStaff } from "common/typings";

import { SkeletonAvatar } from "designs/Avatar";
import { GlobalIcon } from "designs/icons/GlobalIcon";

import AttachmentButton from "./components/AttachmentButton";
import MessageList from "./components/MessageList";

interface IConversationBoxProps {
  data?: ICareStaff;
  onClose: () => void;
}

const ConversationBox: React.FC<IConversationBoxProps> = props => {
  const { data, onClose } = props;

  const [text, setText] = useState("");
  const [textList, setTextList] = useState<Record<any, any>[]>([]);

  const scrollToBottom = (firstTime = false) => {
    const MessageContainer = MessageContainerRef!.current!;
    if (firstTime) {
      MessageContainer.scrollTop = MessageContainer.scrollHeight;
      return;
    }
    // is user scrolling up to read previous messages
    const isBottom =
      MessageContainer.scrollTop + MessageContainer.clientHeight ===
      MessageContainer.scrollHeight;
    if (isBottom) {
      MessageContainer.scrollTop = MessageContainer.scrollHeight;
    }
  };

  useEffect(() => {
    let firstTime = true;
    if (firstTime) {
      scrollToBottom(true);
      firstTime = false;
    } else {
      scrollToBottom();
    }
  }, [textList]);

  const handleChangeText = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text) {
      setTextList(state => [...state, { text, own: true }]);
      setText("");
    }
  };

  const MessageContainerRef = useRef<HTMLDivElement | null>(null);
  const avatar =
    data?.user?.urlAvt?.small ||
    data?.user?.urlAvt?.medium ||
    data?.user?.urlAvt?.default ||
    SkeletonAvatar;
  return (
    <div className="w-full h-full flex flex-col bg-white shadow">
      <div className="mb-2 flex-none flex items-center gap-1 bg-primary text-white leading-none phone:gap-2 py-1 px-1 phone:px-2">
        <img
          src={avatar}
          alt="avatar"
          className="flex-none w-3 h-3 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1 text-lg font-semibold">
          <p className="truncate">{data?.user?.displayName}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose();
          }}
          className="flex-none w-1.3"
        >
          <GlobalIcon.CloseIcon className="fill-current text-white hover:text-body" />
        </button>
      </div>
      <div>
        <button
          type="button"
          // onClick={}
          className="hover:bg-primary-dark transition-all w-full bg-primary-light text-white py-1.3 font-semibold"
        >
          Xác nhận đã chăm sóc
        </button>
      </div>
      <div
        className="flex-1 px-1 phone:px-2 overflow-y-auto"
        ref={MessageContainerRef}
      >
        <MessageList textList={textList} />
      </div>
      <div className="flex-none flex items-center gap-0.5 p-1 phone:p-2">
        <AttachmentButton type="image" />
        <AttachmentButton type="file" />
        <div className="flex-1 border border-solid border-line rounded-3xl overflow-hidden">
          <input
            type="text"
            value={text}
            onChange={handleChangeText}
            onKeyDown={handleKeyDown}
            placeholder="Aa..."
            className="block w-full py-1 pl-3 pr-1 h-3.5"
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
