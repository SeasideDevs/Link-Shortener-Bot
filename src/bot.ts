import { Client } from "discord.js";

const bot = new Client({
  disableMentions: "everyone",
  ws: {
    intents: config.client.intents
  },
});

bot.login();