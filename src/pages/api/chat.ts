import { type NextApiRequest, type NextApiResponse } from "next";
import { getReply } from "../../server/chat/gpt3";
import { prisma } from "../../server/db/client";

const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const userMessage = body.Body;
  if (!userMessage) {
    console.error("No message body");
    res.status(400).json({ error: "No message body" });
    return;
  }
  console.log("User Message", userMessage);
  const reply = await getReply(userMessage, req.body.From);
  console.log("Reply", reply);
  console.log("msg", req.body.From, req.body.To, req.body.Body);
  res.status(200).json(reply);
};

export default chat;
