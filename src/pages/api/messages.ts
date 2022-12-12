import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

import { twiml } from "twilio";
import { getReply } from "../../server/chat/gpt3";

const { MessagingResponse } = twiml;
const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  const userMessage = req.body.Body;
  const response = new MessagingResponse();
  try {
    const reply = await getReply(userMessage, req.body.From);
    console.log("msg", req.body.From, req.body.To, req.body.Body);
    response.message(reply.text);
  } catch (error) {
    console.error(error);
    response.message(`Failed to reply for ${userMessage}.`);
  }

  res.setHeader("Content-Type", "application/xml");
  res.send(response.toString());
};

export default chat;
