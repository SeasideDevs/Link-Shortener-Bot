module.exports = {
  name: "dscgg",
  description: "Gets info on a [dsc.gg](https://dsc.gg) link.",
  aliases: [],
  ownerOnly: true,
  guildOnly: false,
  args: true,
  cooldown: 3,
  usage: "<part after the links slash>",
  category: "utility",
  execute(msg, args, client, config, prefix, axios, Discord, avatar, database) {
    const errors = require(`../snippets/dscgg.json`);
    const Link = require("dsc.js");
    const dscgg = new Link.Client(process.env.DSCGG_TOKEN);
    const input = args[0];
    if (input.length > 120) {
      return msg.channel.send(
        `You cannot lookup links longer than 120 characters`
      );
    }

    const upperCase = (type) => {
      let letters = type.split(``);
      // removes first item from array future me
      const firstLetter = letters[0];
      letters.shift();
      letters.unshift(firstLetter.toUpperCase());
      return letters.join(``);
    };

    async function run() {
      const data = await dscgg.fetchLink(input + `?with_stats=true`);
      if (!data.success) {
        if (data.code === errors.notfound) {
          msg.channel.send(`That link does not exist`);
        } else if (data.code === errors.protected) {
          msg.channel.send(
            `You cannot see info about this link as its password protected`
          );
        } else {
          msg.channel.send(`There was an error fetching that link`);
        }
        return;
      }
      const owner = await client.users.fetch(data.payload.owner);
      const type = await upperCase(data.payload.type);
      const link = await upperCase(data.payload.id);
      let color = data.payload.meta.color.replace(`#`, ``);
      let redirect = await `||${data.payload.redirect}||`;
      if (type === "Bot") {
        redirect = `Redirect link is too long. Click [here](${data.payload.redirect}) instead`;
      }
      const embed = await new Discord.MessageEmbed()
        .setColor(data.payload.meta.color)
        .setTitle(`Info for Link: **${link}**`)
        .setThumbnail(data.payload.meta.image)
        .addField(`👑  Owner:`, `**Username:** ${owner.tag}`)
        .addField(`📄  Info:`, `**Type:** ${type}\n**Redirect:** ${redirect}`)
        .addField(
          `📊  Stats:`,
          `**Clicks:** ${data.payload.stats.clicks}\n**Unique Clicks:** ${data.payload.stats.unique_clicks}`
        )
        .addField(
          `📗  Embed:`,
          `**Color:** [${data.payload.meta.color}](https://dummyimage.com/1000x1000/${color}/${color})\n**Image:** Click [here](${data.payload.meta.image})`
        );

      msg.channel.send(embed);
    }

    run();
  },
};
