// Simple Chat Component

import React, { useState } from "react";

const SimpleChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    const userMessage = {
      text: newMessage,
      sender: 'user'
    };
    setMessages([...messages, userMessage]);

    const botMessage = {
      text: 'Placeholder bot message',
      sender: 'bot'
    };
    setMessages(prevMessages => [...prevMessages, botMessage]);

    setNewMessage("");
  };

  return (
    <div className="chat-component">
      {messages.map((message, index) => (
        message.sender === 'user' ?
        <p key={index} className="user-message">{message.text}</p> :
        <p key={index} className="bot-message">{message.text}</p>
      ))}
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
    );
}

export default SimpleChat;














