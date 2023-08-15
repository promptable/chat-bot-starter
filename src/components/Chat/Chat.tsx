import classNames from "classnames";
import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useMessages } from "../../hooks/useMessages";
import BotMessage from "../BotMessage";
import UserMessage from "../UserMessage";

const supportedLanguages = 
[
  {-: "py",
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

export default function Chat() {
  const {
    messages,
    userInput,
    handleKeyDown,
    submit,
    handleClear,
    ref,
  } = useMessages();

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
              onClick={submit}
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
