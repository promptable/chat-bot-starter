import { type NextApiRequest, type NextApiResponse } from "next";
import { clearChatHistory } from "../../server/chat/gpt3";

const clear = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  console.log("Body", body, "clearing chat history")
  const { userId } = body.Body;
  console.log(userId, userId);
  if (!userId) {
    res.status(400).json({ error: "No message body" });
    return;
  }
  const reply = await clearChatHistory(userId);
  console.log("Reply", reply);
  res.status(200).json(reply);
};

export default clear;
