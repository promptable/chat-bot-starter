import { useCallback, useEffect, useRef, useState } from "react";
import { scrollToBottom } from "../../utils/scrollToBottom";
import { v4 as uuid } from "uuid";
import { chatUserIdAtom } from "/src/pages/_app";
import { useAtomValue } from "jotai";
import { useChatApi } from "./chatApi";

interface Message {
  isUserMessage: boolean;
  text: string;
  id: string;
}

const createMessage = (text: string, isUserMessage: boolean): Message => {
  return {
    isUserMessage,
    text,
    id: uuid(),
  };
};

export const useMessages = () => {
  const userId = useAtomValue(chatUserIdAtom);
  const { getAgentReplyMutation, clearChatHistoryMutation } = useChatApi();

  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");

  // ref to track text area and scroll text into view
  const ref = useRef<HTMLParagraphElement | null>(null);
  
  const handleScroll = useCallback(() => {
    if (ref.current) {
      scrollToBottom(ref.current);
    }
  }, []);
  
  const submit = async () => {
    const prevMessage = messages[messages.length - 1]?.text;
    setMessages((prevMessages) => [...prevMessages, createMessage(userInput, true)]);
  
    const userText = userInput;
    setUserInput("");
    const response = await getAgentReplyMutation.mutateAsync({
      userId,
      userText,
      prevMessage,
    });
  
    handleScroll();
  
    const { text } = await response.json();
    setMessages((prevMessages) => [...prevMessages, createMessage(text, false)]);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };
  
  const handleClear = async () => {
    setMessages([]);
    await clearChatHistoryMutation.mutateAsync({ userId });
  };
  
  return {
    messages,
    userInput,
    handleKeyDown,
    submit,
    handleClear,
    ref,
  };
};