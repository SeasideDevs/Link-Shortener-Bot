module.exports = {
  name: "links",
  description: "Shows various links related to the bot",
  aliases: ["vote", "invite", "support", "trello"],
  ownerOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const embed = new Discord.MessageEmbed()
      .setColor(config.colors.main)
      .setAuthor(`Links`, avatar)
      .addField(`Invite`, `[Click Here](https://dsc.gg/seashell)`)
      .addField(`Support Server`, `[Click Here](https://dsc.gg/sea)`)
      .addField(`Website`, `<:soon:777646807970742274>`)
      .addField(
        `Trello`,
        `[Click Here](https://trello.com/b/VB9TEZd9/seashell)`
      );

    msg.channel.send(embed);
  },
};
