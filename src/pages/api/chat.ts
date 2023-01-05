import { env } from "../../env/server.mjs";
import { type NextApiRequest, type NextApiResponse } from "next";
import { PromptableApi } from "promptable";
import { getReply } from "../../server/chat/gpt3";
import { Configuration, OpenAIApi } from "openai";

export const EMPATHY_PROMPT_ID = "clcj71xae00a0i6eghu9v7xbo";
const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  const { userId, messageText, prevMessage } = body.Body;
  const reply = await getReply(userId, messageText || "");
  console.log("Reply", reply);

  console.log("PREV MESSAGE", prevMessage);
  if (!prevMessage) {
    res.status(200).json(reply);
    return;
  }
  console.log("checking empathy...");

  // now determine the empathy of the message
  // Get the prompt and config from the Promptable API
  // (Optionally) replace this call with a local hard-coded prompt and config
  const data = await PromptableApi.getActiveDeployment({
    promptId: EMPATHY_PROMPT_ID,
  });

  let prompt = data.text;
  prompt = prompt.replace("{{messageA}}", prevMessage);
  prompt = prompt.replace("{{messageB}}", messageText);

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
    response.data.choices[0]?.text?.trim() || res.status(200).json(reply);

  res.status(200).json({
    ...reply,
    empathy: agentText,
  });
};

export default chat;
