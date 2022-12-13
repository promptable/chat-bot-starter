/*
 Memory for storing chat history by phone number

promptId is a Promptable.ai thing. If you're using your own local prompt,
you can just hard-code the promptId (which is used to identify the prompt)
if you want to reset/switch between prompts in the chat using the 
"reset <promptId>" command.

*/

export type Turn = {
  speaker: string;
  text: string;
};

export interface ChatHistory {
  promptId: string;
  userId: string;
  turns: Turn[];
}

export class ChatHistoryStore {
  private history: { [chatId: string]: ChatHistory } = {};

  create(
    userId: string,
    promptId: string
  ): ChatHistory | undefined {
    this.history[userId] = {
      promptId: promptId,
      userId: userId,
      turns: [],
    };
    return this.history[userId];
  }

  add(userId: string, message: string, speaker: string) {
    const turn = {
      speaker: speaker,
      text: message,
    };
    this.history[userId]?.turns.push(turn);
  }

  get(userId: string): ChatHistory | undefined {
    return this.history[userId];
  }
}
