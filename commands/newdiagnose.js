module.exports = {
  name: "newdiagnose",
  description: "Diagnoses the bots current permissions",
  ownerOnly: false,
  guildOnly: true,
  args: false,
  cooldown: 3,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    // Checks for Administrator permission and returns if it has it
    let description = ``;
    let color;
    let embed = new Discord.MessageEmbed()
      .setColor(config.mainColor)
      .setTitle(`Permissions`);

    if (msg.guild.me.hasPermission("ADMINISTRATOR")) {
      embed.setColor(config.mainColor);
      embed.setDescription(`✅  I have all permissions required!`);
      return msg.channel.send(embed);
    }

    const requiredPermissions = [
      {
        name: "ADD_REACTIONS",
        friendlyName: "Add Reactions",
      },
      {
        name: "VIEW_CHANNEL",
        friendlyName: "View Channels",
      },
      {
        name: "SEND_MESSAGES",
        friendlyName: "Send Messages",
      },
      {
        name: "EMBED_LINKS",
        friendlyName: "Embed Links",
      },
      {
        name: "READ_MESSAGE_HISTORY",
        friendlyName: "Read Message History",
      },
      {
        name: "USE_EXTERNAL_EMOJIS",
        friendlyName: "Use External Emotes",
      },
    ];

    for (const permission of requiredPermissions) {
      if (msg.guild.me.hasPermission(permission.name)) {
        description += `\n✅  ${permission.friendlyName}`;
      } else {
        description += `\n<:denied:801937835686756402>  ${permission.friendlyName}`;
        color = config.errorColor;
      }
    }

    msg.react("✅");
    embed.setDescription(description);
    embed.setColor(color);
    msg.channel.send(embed);
  },
};
