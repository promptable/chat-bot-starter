import { type NextApiRequest, type NextApiResponse } from "next";

import { twiml } from "twilio";
import { clearChatHistory, getReply } from "../../server/chat/gpt3";

const { MessagingResponse } = twiml;
const handleTextMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const userMessage = req.body.Body;
  console.log("userMessage", userMessage);
  console.log("From/To", req.body.From, req.body.To);
  const response = new MessagingResponse();
  try {
    let reply;
    if (userMessage.trim().toLowerCase() === "reset") {
      reply = await clearChatHistory(req.body.From);
    } else {
      reply = await getReply(req.body.From, userMessage);
    }
    response.message(reply.text);
  } catch (error) {
    console.error(error);
    response.message(`Failed to reply for ${userMessage}.`);
  }

  res.setHeader("Content-Type", "application/xml");
  res.send(response.toString());
};

export default handleTextMessage;
