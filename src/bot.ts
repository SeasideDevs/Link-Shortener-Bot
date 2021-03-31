import { Client } from "discord.js";
import { parseConfig } from "./functions/parse";
const config = parseConfig();
const bot = new Client({
  disableMentions: "everyone",
  ws: {
    intents: config.client.intents,
  },
});
import { log } from "./functions/logger";
log("test", { type: "fatal" });

bot.login();
