import { Client } from "discord.js";
import { parseConfig } from "./functions/parse";
const config = parseConfig();
console.log(config);
/* const bot = new Client({
  disableMentions: "everyone",
  ws: {
    intents: config.client.intents,
  },
}); */

//bot.login();
