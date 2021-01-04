module.exports = {
  name: "unblacklist",
  description: "Prevent someone from using the bot",
  ownerOnly: true,
  guildOnly: false,
  args: true,
  usage: "<user>",
  cooldown: 3,
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const chalk = require("chalk");
    const id = args[0];

    async function run() {
      const data = await blacklist.get(id);
      if (!data) {
        return msg.channel.send(`That user isn't blacklisted`);
      }
      try {
        const fetched = await client.users.fetch(id);
        await blacklist.delete(id, "blacklist");
        msg.channel.send(`Unblacklisted **${fetched.tag}**`);
      } catch (e) {
        msg.channel.send(
          `There was an error while attempting to blacklist that user`
        );
      }
    }

    run();
  },
};
