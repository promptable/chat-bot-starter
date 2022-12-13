import { type NextApiRequest, type NextApiResponse } from "next";
import { getReply } from "../../server/chat/gpt3";

const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const { userId, messageText } = body.Body;
  const reply = await getReply(userId, messageText || "");
  console.log("Reply", reply);
  res.status(200).json(reply);
};

export default chat;
