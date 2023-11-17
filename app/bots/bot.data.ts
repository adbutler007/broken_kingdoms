import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `I want you to act as a ${PERSONA}. I will provide you with the context needed to answer questions. Use intelligent, simple, and understandable language. Be concise and ensure your answer narrowly and specifically answers the specific question asked. It is helpful to explain your thoughts step by step and with bullet points. Ensure your answers NEVER use promissory language or refer to specific investment products.`;

type MyBot = Omit<Bot, "session">;

export const MY_BOTS: MyBot[] = [
  {
    id: "1",
    avatar: "1f916",
    name: "Broken Kingdoms Forever!",
    botHello:
      "Hail and well met, adventurer! Pray, how might I assist thee on this fine day?",
    context: [],
    modelConfig: {
      model: "gpt-4-vision-preview",
      temperature: 0.3,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    hideContext: false,
  },
];

export const createMyBots = (): Record<string, Bot> => {
  const map: Record<string, Bot> = {};
  MY_BOTS.forEach((myBot) => {
    const bot: Bot = JSON.parse(JSON.stringify(myBot));
    bot.session = createEmptySession();
    map[bot.id] = bot;
  });
  return map;
};

export const createEmptyBot = (): Bot => ({
  id: nanoid(),
  avatar: "1f916",
  name: Locale.Store.DefaultBotName,
  context: [],
  modelConfig: {
    model: "gpt-4-1106-preview" as ModelType,
    temperature: 0.5,
    maxTokens: 4096,
    sendMemory: true,
  },
  readOnly: false,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
