import { Client } from "discord.js";
import { parseConfig } from './functions/parse';
const config = parseConfig()
const bot = new Client({
  disableMentions: "everyone",
  ws: { intents: ["GUILDS", "GUILD_MESSAGES"] },
});

bot.login();