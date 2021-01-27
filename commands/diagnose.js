module.exports = {
  name: "diagnose",
  description: "Diagnoses the bots current permissions",
  ownerOnly: false,
  guildOnly: true,
  args: false,
  cooldown: 3,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    let description = ``;
    let embed = new Discord.MessageEmbed()
      .setColor(config.mainColor)
      .setAuthor(`Permissions`, avatar);

    // Checks for Administrator permission

    if (msg.guild.me.hasPermission("ADMINISTRATOR")) {
      embed.setColor(config.colors.main);
      embed.setDescription(`✅  I have all permissions required!`);
      return msg.channel.send(embed);
    }
    // Checks for Add Reactions permission

    if (msg.guild.me.hasPermission("ADD_REACTIONS")) {
      description += `\n✅  Add Reactions`;
    } else {
      description += `\n<:deny:779782129890361354> Add Reactions`;
    }

    // Checks for View Channel permission

    if (msg.guild.me.hasPermission("VIEW_CHANNEL")) {
      description += `\n✅  View Channel`;
    } else {
      description += `\n<:deny:779782129890361354> View Channel`;
    }

    // Checks for Send Messages permission

    if (msg.guild.me.hasPermission("SEND_MESSAGES")) {
      description += `\n✅  Send Messages`;
    } else {
      description += `\n<:deny:779782129890361354> Send Messages`;
    }

    // Checks for Embed Links permission

    if (msg.guild.me.hasPermission("EMBED_LINKS")) {
      description += `\n✅  Embed Links`;
    } else {
      description += `\n<:deny:779782129890361354> Embed Links`;
    }

    // Checks for Read Message History permission

    if (msg.guild.me.hasPermission("READ_MESSAGE_HISTORY")) {
      description += `\n✅  Read Message History`;
    } else {
      description += `\n<:deny:779782129890361354> Read Message History`;
    }

    // Checks for External Emojis permission

    if (msg.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
      description += `\n✅  External Emojis`;
    } else {
      description += `\n<:deny:779782129890361354> External Emojis`;
    }

    embed.setDescription(description);
    msg.channel.send(embed);
  },
};
