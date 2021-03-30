import { checks } from "./core/bootchecks";
import { ShardingManager } from "discord.js";
import { checkServerIdentity } from "tls";
const manager = new ShardingManager("bot.ts", {
  token: process.env.TOKEN,
});
