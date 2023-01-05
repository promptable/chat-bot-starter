import classNames from "classnames";
import { useAtomValue } from "jotai";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { scrollToBottom } from "../../utils/scrollToBottom";
import { v4 as uuid } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "react-query";
import { chatUserIdAtom } from "src/pages/_app";

const supportedLanguages = [
  {
    id: "py",
    name: "python",
  },
  {
    id: "ts",
    name: "typescript",
  },
  {
    id: "js",
    name: "javascript",
  },
  {
    id: "html",
    name: "html",
  },
];

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

export default function Chat() {
  const userId = useAtomValue(chatUserIdAtom);

  // ref to track text area and scroll text into view
  const ref = useRef<HTMLParagraphElement | null>(null);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      scrollToBottom(ref.current);
    }
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    handleScroll();
  }, [messages, handleScroll]);

  const [userInput, setUserInput] = useState("");

  const getAgentReply = async (userData: any) => {
    return await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        Body: {
          userId: userData.userId,
          messageText: userData.userText,
          prevMessage: userData.prevMessage,
        },
      }),
    });
  };

  const clearChatHistory = async (userData: any) => {
    return await fetch("/api/clear", {
      method: "POST",
      body: JSON.stringify({
        Body: {
          userId: userData.userId,
        },
      }),
    });
  };

  // Mutations
  const getAgentReplyMutation = useMutation(getAgentReply);
  const clearChatHistoryMutation = useMutation(clearChatHistory);

  const [empathy, setEmpathy] = useState<string | null>(null);
  const submit = async () => {
    console.log("messages", messages);
    const prevMessage = messages[messages.length - 1]?.text;
    setMessages((prevMessages) => {
      return [...prevMessages, createMessage(userInput, true)];
    });

    const userText = userInput;
    setUserInput("");
    const response = await getAgentReplyMutation.mutateAsync({
      userId,
      userText,
      prevMessage: prevMessage,
    });

    handleScroll();

    const { text, empathy } = await response.json();
    if (empathy) {
      setEmpathy(empathy);
    }
    setMessages((prevMessages) => {
      return [...prevMessages, createMessage(text, false)];
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };

  const handleClear = async () => {
    setMessages([]);
    const response = await clearChatHistoryMutation.mutateAsync({ userId });
    const jsonblob = await response.json();
    console.log("Clear Response", jsonblob);
  };

  const [loaded, setLoaded] = useState(false);
  // the initial message
  useEffect(() => {
    if (loaded) {
      return;
    }

    (async () => {
      const response = await getAgentReplyMutation.mutateAsync({
        userId,
        userText: "Hi",
      });

      const { text } = await response.json();
      setMessages([createMessage(text, false)]);
    })();

    setLoaded(true);
  }, [getAgentReplyMutation, userId, loaded, setLoaded]);

  return (
    <div className="grid h-full h-full grid-cols-7">
      <div className="col-span-3 ">
        Empathy
        <div>{empathy}</div>
      </div>
      <div className="col-span-4 h-[700px] h-full">
        <div className="flex h-full flex-grow flex-col justify-between">
          <div className="flex-grow overflow-y-scroll" ref={ref}>
            <ul>
              {messages?.map((msg) => {
                return (
                  <li key={msg.id} className="py-2">
                    {msg.isUserMessage ? (
                      <UserMessage msg={msg} />
                    ) : (
                      <BotMessage msg={msg} />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            <ReactTextareaAutosize
              maxRows={5}
              onKeyDown={handleKeyDown}
              className={classNames(
                "flex-grow resize-none rounded-md py-2 px-2 text-3xl shadow-xl outline outline-base-300",
                "scroll m-0 box-border resize-none border-none bg-transparent hover:ring-2",
                "min-w-none p max-w-none"
              )}
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
            />
            <button
              disabled={!messages.length}
              onClick={() => submit()}
              className={classNames("daisy-btn-primary daisy-btn")}
            >
              Run
            </button>
            <button
              disabled={!messages.length}
              onClick={handleClear}
              className={classNames("daisy-btn")}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export const BotMessage = ({ msg }: { msg: Message }) => {
  return (
    <div className="flex items-center space-x-8 border-y-2 bg-base-300 py-10 px-40 text-xl">
      <div className="daisy-placeholder daisy-avatar">
        <div className="daisy-mask daisy-mask-square w-8 bg-secondary text-3xl font-black text-accent"></div>
      </div>
      <div className={classNames("rounded-md text-xl text-base-content")}>
        {msg.text?.length ? (
          msg.text.trim()
        ) : (
          <span className="">Loading...</span>
        )}
      </div>
    </div>
  );
};
