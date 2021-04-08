import { Client } from "discord.js";
import { parseConfig } from "./functions/parse";
const config = parseConfig();
// Create a new instance of a Client
const bot = new Client({
  disableMentions: "everyone",
  ws: {
    intents: config.client.intents,
  },
});
import { log } from "./functions/logger";

// Logs the shard in
// No token needed as it is provided by the sharding manager
bot.login();
