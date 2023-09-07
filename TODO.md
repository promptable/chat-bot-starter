# TODO

- Make it possible for multiple users to chat with the ui app at the same time (BUG)
  - Right now, there is no FROM field being sent from the ui.
- Make the server/chat/gpt3 code chat history generic, don't assume a phone number
- Add a way to reset the chat history from the ui chat client
- Modify [src/pages/api/chat.ts](https://github.com/promptable/chat-bot-starter/blob/main/src/pages/api/chat.ts)
  - Import `getReply` function from `src/server/chat/gpt3`
  - Use `getReply` function with arguments `userId` and `messageText` to get the reply
  - If there is no previous message, return the reply JSON
  - If there is a previous message, determine the empathy of the message
- Modify [src/server/chat/gpt3.ts](https://github.com/promptable/chat-bot-starter/blob/main/src/server/chat/gpt3.ts)
  - Write related functions for handling chat history management and response generation
  - Define the main `getReply` function for generating responses given a userId and message

