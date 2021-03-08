module.exports = {
  name: "eval",
  description: "Runs Javascript code on the shard its used on. Owner only",
  aliases: ["e"],
  ownerOnly: true,
  guildOnly: false,
  args: true,
  cooldown: 3,
  usage: "<code>",
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    let code = args.join(" ");
    let returned = ``;
    let success;
    const embed = new Discord.MessageEmbed()
      .addField(`📤 Original Code`, "```javascript\n" + code + "```")
      .setFooter(`Requested by ${msg.author.tag}`);

    async function run() {
      try {
        let token = code.search("client.token");
        if (token !== -1) {
          returned = `Nice Try`;
        } else {
          let rawReturned = await eval(code);
          returned += rawReturned;
        }
        embed.setColor(config.colors.main);
        embed.setAuthor(`Success!`, avatar);
        embed.addField(`📥 Result`, "```javascript\n" + returned + "```");
        msg.react(config.emojis.success);
      } catch (e) {
        returned += e;

        embed.setColor(config.colors.error);
        embed.setAuthor(`Error`, avatar);
        embed.addField(`📥 Result`, "```javacript\n" + returned + "```");
        msg.react(config.emojis.error);
      }
      msg.channel.send(embed);
    }

    run();
  },
};
