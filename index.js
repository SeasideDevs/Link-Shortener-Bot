const { ShardingManager } = require("discord.js");
const Statcord = require("statcord.js");
const token = process.env.BOT_TOKEN;
const statcordToken = process.env.STATCORD_TOKEN;
let statcord;
const manager = new ShardingManager("./bot.js", { token: token });
const chalk = require("chalk");
const config = require("./config.json");

if (config.pingRequired) {
  const express = require("express");
  const config = require("../config.json");
  const app = express();
  const port = config.port;

  app.get("/", (req, res) => {
    res.send(`Hello`);
  });

  app.listen(port, () => {
    console.log(chalk.inverse(`INFO`), `Express Server Running`);
  });
}

if (statcordToken) {
  statcord = new Statcord.ShardingClient({
    key: statcordToken,
    manager,
    postCpuStatistics: true /* Whether to post CPU statistics or not, defaults to true */,
    postMemStatistics: true /* Whether to post memory statistics or not, defaults to true */,
    postNetworkStatistics: true /* Whether to post memory statistics or not, defaults to true */,
    autopost: true /* Whether to auto post or not, defaults to true */,
  });
}

manager.on("shardCreate", (shard) => {
  console.log(chalk.blue(`SHARD`), `Launched Shard ${shard.id}`);

  shard.on("death", (shard) => {
    console.log(chalk.red(`SHARD`), `Shard Died`);
  });
  shard.on("disconnect", (shard) => {
    console.log(chalk.red(`SHARD`), `Shard ${shard.id} Disconnected`);
  });
  shard.on("reconnecting", (shard) => {
    console.log(chalk.red(`SHARD`), `Shard ${shard.id} Reconnecting`);
  });
});

manager.spawn();

if (statcord) {
  statcord.on("autopost-start", () => {
    // Emitted when statcord autopost starts
    console.log("Started autopost");
  });

  statcord.on("post", (status) => {
    // status = false if the post was successful
    // status = "Error message" or status = Error if there was an error
    if (!status) console.log("Successful post");
    else console.error(`Error`);
  });
}
