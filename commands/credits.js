module.exports = {
  name: "credits",
  description: "Shows info about people who made Seashell possible",
  aliases: ["helpers"],
  ownerOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const embed = new Discord.MessageEmbed()
      .setColor(config.colors.main)
      .setTitle(`Credits`)
      .setDescription(
        `**[Issai H#5682](https://issai.club)**: Making the bot itself and all the features.\n**[X Daniel#0017](https://arcticbot.com/invite)**: Constantly yelling at me (Issai) to fix stuff and telling me my code is sh**. He also helped with code snippets.`
      );

    msg.channel.send(embed);
  },
};
