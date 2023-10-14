import { useMutation } from "react-query";

export const useChatApi = () => {
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

  const getAgentReplyMutation = useMutation(getAgentReply);
  const clearChatHistoryMutation = useMutation(clearChatHistory);

  return {
    getAgentReplyMutation,
    clearChatHistoryMutation,
  };
};