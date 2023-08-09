import { Message } from "./Chat";
import React, { useState } from 'react';
import classNames from "classnames";
interface BotMessageProps {
  msg: Message;
  empathy?: string;
}

export const BotMessage = ({ msg, empathy }: BotMessageProps) => {
  const [reveal, setReveal] = useState(false);
  const handleReveal = () => {
    setReveal(true);
  };

  return (
    <div
      onClick={handleReveal}
      className={classNames(
        "flex items-center space-x-8 border-y-2 bg-base-300 py-10 px-40 text-xl cursor-text"
      )}
    >
      <div className="daisy-placeholder daisy-avatar">
        <div className="daisy-mask daisy-mask-square w-8 bg-secondary text-3xl font-black text-accent"></div>
      </div>
      {reveal && empathy ? (
        <div>
          <div className={classNames("rounded-md text-xl text-base-content")}>
            {empathy}
          </div>
          <div
            className={classNames(
              "mt-2 rounded-md text-xl text-base-content bg-primary px-2"
            )}
          >
            {msg.text.trim() || "Loading..."}
          </div>
        </div>
      ) : (
        <div className={classNames("rounded-md text-xl text-base-content")}>
          {msg.text.trim() || "Loading..."}
        </div>
      )}
    </div>
  );
};

export default BotMessage;