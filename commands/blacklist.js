const { ReactionUserManager } = require("discord.js");

module.exports = {
  name: "blacklist",
  description: "Manage the blacklist. Owner only",
  aliases: [],
  ownerOnly: true,
  guildOnly: false,
  args: true,
  cooldown: 3,
  usage: "<view|>",
  category: "fun",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    async function run() {
      const subcommand = args[0];
      if (["check", "add", "remove"].includes(args[0]) === -1) {
        return msg.channel.send("Not a valid subcommand");
      }
      const userID = args[1];
      const regex = new RegExp("[0-9]{18}");
      if (regex.test(userID) === false) {
        return msg.channel.send("Not a valid ID");
      }
      const blacklist = require("../functions/blacklist");
      const blacklistDB = database.collection("blacklist");

      if (subcommand === "check") {
        const data = await blacklist.check(args[1], blacklistDB);
        if (data === false) {
          return msg.channel.send("That user is not blacklisted");
        }
        console.log(data);
        const user = await client.users.fetch(data.userID);
        const moderator = await client.users.fetch(data.moderatorID);

        const embed = new Discord.MessageEmbed()
          .setColor(config.colors.main)
          .setAuthor(`Viewing Ban for ${user.tag}`)
          .setDescription(
            `**Ban Reason:** ${data.reason}\n**Moderator:** ${data.moderatorID}\n**Appealable:** ${data.appealable}\n**Blacklisted At:** ${data.blacklistedAt}\n**User ignored:** ${data.ignoreUser}`
          );
        msg.channel.send(embed);
      }

      if (subcommand === "add") {
        if (
          ( blacklist.add(
            userID,
            blacklistDB,
            "banana",
            msg.author.id,
            true,
            Date.now(),
            false
          )) === false
        ) {
          msg.channel.send("blacklisted already");
          console.log();
        }
      }
    }
    run();
  },
};
