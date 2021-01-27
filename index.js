const { ShardingManager } = require("discord.js");
const Statcord = require("statcord.js");
const token = process.env.BOT_TOKEN;
const statcordToken = process.env.STATCORD_TOKEN;
let statcord;
const manager = new ShardingManager("./bot.js", { token: token });
const chalk = require("chalk");
require('toml-require').install({toml: require('toml')})
const config = require("./config.toml");
const logger = require("./functions/logger.js");

if (config.httpserver.enabled) {
  const express = require("express");
  const app = express();
  const port = config.httpserver.port;

  app.get("/", (req, res) => {
    res.send(`Hello`);
  });

  app.listen(port, () => {
    console.log(chalk.inverse(`INFO`), `Express Server Running`);
    logger.log(`info`, `Express Server Running`);
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
  logger.log(`shard`, `Launched Shard ${shard.id}`);

  shard.on("death", (shard) => {
    console.log(chalk.red(`SHARD`), `Shard Died`);
    logger.log(`error`, `Shard Died`);
  });
  shard.on("disconnect", (shard) => {
    console.log(chalk.red(`SHARD`), `Shard ${shard.id} Disconnected`);
    logger.log(`error`, `Shard ${shard.id} Disconnected`);
  });
  shard.on("reconnecting", (shard) => {
    console.log(chalk.red(`SHARD`), `Shard ${shard.id} Reconnecting`);
    logger.log(`error`, `Shard ${shard.id} Reconnecting`);
  });
});

manager.spawn();

if (statcord) {
  statcord.on("autopost-start", () => {
    // Emitted when statcord autopost starts
    console.log("Started Autopost");
    logger.log(`info`, `Started Autopost`);
  });

  statcord.on("post", (status) => {
    // status = false if the post was successful
    // status = "Error message" or status = Error if there was an error
    if (!status) {
      console.log(`Successful Post`);
      logger.log(`info`, `Successful Post`);
    } else {
      console.error(`Error`);
      logger.log(`error`, `An error occured while posting stats`);
    }
  });
}
