import type { Message } from "./Chat";
import React from 'react';

export const UserMessage = ({ msg }: { msg: Message }) => {
  return (
    <div className="flex items-center space-x-8 py-10 px-40 text-xl">
      <div className="daisy-placeholder daisy-avatar">
        <div className="daisy-mask daisy-mask-square w-8 bg-primary text-3xl font-black text-accent">
          {""}
        </div>
      </div>
      <p>{msg.text}</p>
    </div>
  );
};

export default UserMessage;