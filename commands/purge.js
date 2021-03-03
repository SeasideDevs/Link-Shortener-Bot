module.exports = {
  name: "purge",
  description: "Bulk deletes messages in the channel it's used in",
  aliases: ["clear"],
  ownerOnly: true,
  guildOnly: true,
  args: true,
  cooldown: 3,
  usage: "",
  category: "moderation",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const member = msg.guild.member(msg.author);
    if (!member.hasPermission(`MANAGE_MESSAGES`)) {
      msg.channel.send(`This command can only be used my mods`);
    }
    const amount = parseInt(args[0]);
  },
};
