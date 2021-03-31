import { Client } from "discord.js";
const bot = new Client({
  disableMentions: "everyone",
  ws: { intents: ["GUILDS", "GUILD_MESSAGES"] },
});

bot.login();