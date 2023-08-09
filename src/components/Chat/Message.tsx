import React from 'react';

interface MessageProps {
  text: string;
  isUserMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUserMessage }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default Message;