import { Client } from "discord.js";
import { Intents } from "discord.js";
const bot = new Client({
  disableMentions: "everyone",
  ws: { intents: ["GUILDS", "GUILD_MESSAGES"] },
});

bot.login(process.env.TOKEN);

export { bot };
