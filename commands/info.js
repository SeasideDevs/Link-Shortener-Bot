module.exports = {
  name: "info",
  description: "Shows info about Seashell's and its history",
  ownerOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 3,
  usage: "",
  category: "info",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const embed = new Discord.MessageEmbed()
      .setColor(config.colors.main)
      .setAuthor(`Info`, avatar)
      .setTitle(`About Me`)
      .setDescription(
        `I started off as a side project meant to put my owners skills to the test in combining various things that he learned throughout his coding journey. I'm the first bot that my owner made to actually be published. I also started of as a a bot meant to shorten links but I started to become more general purpose. Plus I'm open source. The code is available [here](https://github.com/TheLimifiedLime/Link-Shortner-Bot) if you wish to view/selfhost it`
      );

    msg.channel.send(embed);
  },
};
