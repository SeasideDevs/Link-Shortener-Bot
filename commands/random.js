module.exports = {
  name: "random",
  description:
    "Generates a random set of characters. Not polished enough for the pubic",
  aliases: [],
  ownerOnly: true,
  guildOnly: false,
  args: true,
  cooldown: 3,
  usage: "",
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const random = require("../functions/random.js");
    async function run() {
      msg.channel.send(await random.generateString(args[0]));
    }

    run();
  },
};
