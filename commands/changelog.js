module.exports = {
  name: "changelog",
  description: "Shows the changes of the most recent update",
  ownerOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const embed = new Discord.MessageEmbed()
      .setColor(config.colors.main)
      .setAuthor(`Changelog`, avatar)
      .setTitle(`Version ${config.botVersion}`)
      .setDescription(`STOP COMPLAINING ABOUT MY UPDATES`);

    msg.channel.send(embed);
  },
};
