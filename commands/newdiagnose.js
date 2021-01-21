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

    if (msg.guild.me.hasPermission("ADMINISTRATOR")) {
      embed.setColor(config.mainColor);
      embed.setDescription(`✅  I have all permissions required!`);
      return msg.channel.send(embed);
    }

    const requiredPermission = [{
      name: "ADD_REACTIONS",
      friendlyName: "Add Reactions"
    },
    {
      name: "VIEW_CHANNEL",
      friendlyName: "View Channels"
    },
    {
      name: "SEND_MESSAGES",
      friendlyName: "Send Messages"
    },
    {
      name: "EMBED_LINKS",
      friendlyName: "Embed Links"
    },
    {
      name: "READ_MESSAGE_HISTORY",
      friendlyName: "Read Message History"
    },
    {
      name: "USE_EXTERNAL_EMOJIS"
      friendlyName: "Use External Emotes"
    }]
    
    let description = ``;
    let embed = new Discord.MessageEmbed()
      .setColor(config.mainColor)
      .setAuthor(`Permissions`, avatar)

    for (const permission of requiredPermissions) {
      if (msg.guild.me.hasPermissions(permission.name)) {
        description += `✅  ${permission}`
      }
    }

    msg.react('✅')
    embed.setDescription(description);
    //msg.channel.send(embed);
  },
};
