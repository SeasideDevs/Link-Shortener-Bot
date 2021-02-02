module.exports = {
  name: "poll",
  description:
    "Starts a simple yes/no poll. You can change the reactions used by adding either material, redtriangle, bluetriangle, bluearrows, block as the first argument",
  aliases: [],
  ownerOnly: false,
  guildOnly: true,
  args: true,
  cooldown: 3,
  usage: "<question>",
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    async function run() {
      let embed = new Discord.MessageEmbed()
        .setColor(config.colors.main)
        .setAuthor(`New Poll by ${msg.author.tag}!`, avatar)
        .setFooter(`Vote by clicking one of the reactions below!`);
      const subcommands = [
        "material",
        "redtriangle",
        "bluetriangle",
        "bluearrows",
        "block",
        "Green45DegreeSmallLineWhite45DegreeInversedMediumLineWhiteGreenBackground&&Red45DegreeMediumLineWhiteRed45DegreeInversedMediumLineWhiteRedBackground_Icons",
      ];
      if (subcommands[0] === args[0]) {
        args.shift();
        embed.setDescription(`${args.join(" ")}`);

        const m = await msg.channel.send(embed);
        m.react("787095063649321021");
        m.react("787095093323890698");
      } else if (subcommands[1] === args[0]) {
        args.shift();
        embed.setDescription(`${args.join(" ")}`);

        const m = await msg.channel.send(embed);
        m.react("🔺");
        m.react("🔻");
      } else if (subcommands[2] === args[0]) {
        args.shift();
        embed.setDescription(`${args.join(" ")}`);

        const m = await msg.channel.send(embed);
        m.react("🔼");
        m.react("🔽");
      } else if (subcommands[3] === args[0]) {
        args.shift();
        embed.setDescription(`${args.join(" ")}`);

        const m = await msg.channel.send(embed);
        m.react("⬆️");
        m.react("⬇️");
      } else if (subcommands[4] === args[0]) {
        args.shift();
        embed.setDescription(`${args.join(" ")}`);

        const m = await msg.channel.send(embed);
        m.react("🟩");
        m.react("🟥");
      } else if (subcommands[5] === args[0]) {
        args.shift();
        embed.setDescription(`${args.join(" ")}`);

        const m = await msg.channel.send(embed);
        m.react("787095063649321021");
        m.react("787095093323890698");
      } else {
        embed.setDescription(`${args.join(" ")}`);

        const m = await msg.channel.send(embed);
        m.react("👍");
        m.react("👎");
      }
    }

    run();
  },
};
