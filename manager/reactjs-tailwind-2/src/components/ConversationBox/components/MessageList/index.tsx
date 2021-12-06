import React, { useState } from "react";
import faker from "faker";

import SVG from "designs/SVG";

type IMessage = Record<any, any>;

interface IMessageListProps {
  textList?: IMessage[];
}

const MessageList: React.FC<IMessageListProps> = props => {
  const { textList = [] } = props;

  const messageList = [...results, ...textList];
  return (
    <div className="flex flex-col justify-end gap-1">
      {messageList?.map((item, index) => {
        return (
          <MessageText own={item?.own} text={item?.text} key={String(index)} />
        );
      })}
    </div>
  );
};

export default MessageList;

interface IMessageTextProps {
  own?: boolean;
  text?: string;
}

const MessageText: React.FC<IMessageTextProps> = props => {
  const { own, text = "" } = props;

  return (
    <div className={`flex ${own ? "justify-end" : ""}`}>
      <span
        className={`w-4/5 p-1 leading-tight text-sm rounded-lg ${
          own
            ? "bg-line text-primary rounded-br-none"
            : "bg-primary text-white rounded-bl-none"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

const results: IMessage[] = Array.from({ length: 20 }, (_, index) => ({
  _id: String(index),
  text: faker.random.words(5),
  own: faker.datatype.boolean(),
}));
