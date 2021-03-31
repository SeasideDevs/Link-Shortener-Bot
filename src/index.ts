import fs from "fs";
import { parse } from "@iarna/toml";
//import { checks } from "./core/bootchecks";
const config = parse(
  fs.readFileSync(__dirname + "/config.toml", { encoding: "utf-8" })
);
import { ShardingManager } from "discord.js";
const manager = new ShardingManager(__dirname + "/bot.js", {
  token: process.env.TOKEN,
});

manager.spawn();g