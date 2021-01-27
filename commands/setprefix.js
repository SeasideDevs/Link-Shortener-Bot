module.exports = {
  name: "setprefix",
  description: "Updates the prefix of the bot for the server it is used in",
  ownerOnly: false,
  guildOnly: true,
  args: true,
  cooldown: 3,
  usage: "<>",
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const collection = database.collection("guilds");

    async function run() {
      const data = await collection.findOne({ guildID: msg.guild.id });
      console.log(data);
      if (!data) {
        return msg.channel.send(`No data found for guild yet`);
      } else {
        const filter = { guildID: msg.guild.id };
        const updatedDocument = {
          $set: {
            prefix: args[0],
          },
        };

        const result = await collection.updateOne(filter, updatedDocument);
        msg.channel.send(`Update prefix to ${args[0]}`);
      }
    }
    run();
  },
};
