import { parseConfig } from "./functions/parse";
// Parse the config using the parseConfig() function
const config = parseConfig();
import { log } from "./functions/logger";
import { ShardingManager } from "discord.js";
// Creates a new instace of a ShardingManger
const manager = new ShardingManager(__dirname + "/bot.js", {
  token: process.env.TOKEN,
});

// Spawn the shards
manager.spawn();
// Logs to console every time a shard is created
manager.on("shardCreate", (shard) => {
  log(`Shard ${shard.id} Launched`, { type: "shard" });
});
