/*
  This is a sample GPT-3 bot that uses the Promptable API to get a prompt and config
  and then uses the OpenAI API to generate a response.

  If you don't want to use Promptable, you can just hard-code your prompt and config
  somewhere in this file and replace the call to the Promptable API with a local call.
*/
import { env } from "../../env/server.mjs";
import { Configuration, OpenAIApi } from "openai";
import GPT3Tokenizer from "gpt3-tokenizer";
import axios from "axios";
import type { ChatHistory, Turn } from "./chatHistory";
import { ChatHistoryStore } from "./chatHistory";
import { PromptableApi } from "promptable";

// AI ASSISTANT BOT:
const DEFAULT_AGENT_NAME = "Assistant";
const DEFAULT_PROMPT_ID = "clbilb0kh0008h7eg8jv8owdu";

const tokenizer = new GPT3Tokenizer({ type: "gpt3" });

function countBPETokens(text: string): number {
  const encoded = tokenizer.encode(text);
  return encoded.bpe.length;
}

const store = new ChatHistoryStore();

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type OpenAIResponse = {
  text: string;
};

function leftTruncateTranscript(text: string, maxTokens: number): string {
  const encoded = tokenizer.encode(text);
  const numTokens = encoded.bpe.length;
  const truncated = encoded.bpe.slice(numTokens - maxTokens);
  const decoded = tokenizer.decode(truncated);
  return decoded;
}

function injectValuesIntoPrompt(
  template: string,
  values: { [key: string]: any }
): string {
  let result = template;
  for (const key in values) {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), values[key]);
  }
  return result;
}

/*
 * If the message is "reset" or "reset <promptId>", then reset the chat history
 * and return the new chat history. Otherwise, return null.
 */
function handlePossibleReset(
  userId: string,
  message: string
): ChatHistory | undefined {
  if (message.trim().toLowerCase() === "reset") {
    const promptId = DEFAULT_PROMPT_ID;
    store.create(userId, promptId);
    return store.get(userId);
  }
  const pattern = /reset (\w+)/;
  const match = message.toLowerCase().match(pattern);
  if (match) {
    const promptId = match[1]!;
    store.create(userId, promptId);
    return store.get(userId);
  }

  return undefined;
}

/*
  Get or create a chat history for a userId / phoneNumber
*/
function getOrCreateChatHistory(userId: string, message: string) {
  let chatHistory = handlePossibleReset(userId, message);
  if (chatHistory == null) {
    chatHistory = store.get(userId);
    if (chatHistory == null) {
      chatHistory = store.create(userId, DEFAULT_PROMPT_ID);
    }
  } else {
    console.log("RESETTING CHAT HISTORY!");
    console.log(chatHistory);
  }
}

function formatChatHistoryTurns(turns: Turn[]) {
  return turns.map((turn) => `${turn.speaker}: ${turn.text}`).join("\n");
}

function formatPromptText(chatHistory: ChatHistory, promptTemplate: string) {
  console.log("PromptTemplate", promptTemplate);
  const numTokens = countBPETokens(promptTemplate);
  let turnsText = formatChatHistoryTurns(chatHistory.turns);
  console.log("turnsText", turnsText);
  console.log("Pre Truncation", turnsText);
  turnsText = leftTruncateTranscript(turnsText, 4000 - numTokens);
  console.log("Post Truncation", turnsText);
  const prompt = injectValuesIntoPrompt(promptTemplate, { input: turnsText });
  console.log("Prompt", prompt);
  return prompt;
}

export const getReply = async (
  userId: string,
  message: string
): Promise<OpenAIResponse> => {
  console.log("userId", userId, "message", message);
  // strip whitespace!
  message = message.trim();
  getOrCreateChatHistory(userId, message);
  store.add(userId, message, "User");
  const chatHistory = store.get(userId);
  if (!chatHistory) {
    throw new Error("Chat history should exist!");
  }
  console.log("Chat History", chatHistory);

  // Get the prompt and config from the Promptable API
  // (Optionally) replace this call with a local hard-coded prompt and config
  const data = await PromptableApi.getActiveDeployment({
    promptId: "clcj7swlf00api6eg47wqszsi",
  });

  const prompt = formatPromptText(chatHistory, data.text);
  console.log("PROMPT", prompt);
  const params = {
    prompt,
    model: data.config.model,
    max_tokens: data.config.max_tokens,
    temperature: data.config.temperature,
    stop: data.config.stop,
  };
  console.log(params);
  const response = await openai.createCompletion(params);

  console.log(response.data);
  const agentText =
    response.data.choices[0]?.text?.trim() ||
    "Sorry, I had a problem. Please try again.";
  store.add(userId, agentText, DEFAULT_AGENT_NAME);
  console.log(`${DEFAULT_AGENT_NAME}: ${agentText}`);
  return {
    text: agentText,
  } as OpenAIResponse;
};

/*
  Clear the chat history for a userId
*/
export const clearChatHistory = async (userId: string): Promise<any> => {
  console.log("userId", userId, "resetting");
  getOrCreateChatHistory(userId, "reset");
  return {
    text: "Conversation history cleared",
  };
};
